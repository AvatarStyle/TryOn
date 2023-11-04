package project.avatar.api.controller.products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.avatar.api.entity.Closet;
import project.avatar.api.repo.ClothesRepository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import com.mongodb.client.result.UpdateResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/closet")
public class ClosetController {

    private final ClothesRepository clothesRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    public ClosetController(ClothesRepository clothesRepository) {
        this.clothesRepository = clothesRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<Closet> addToCloset(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String productId = request.get("productId");

        Optional<Closet> optionalCloset = clothesRepository.findByUsername(username);

        if (optionalCloset.isPresent()) {
            Closet closet = optionalCloset.get();

            if (!closet.getProductIds().contains(productId)) { // 중복 체크
                closet.getProductIds().add(productId);
                clothesRepository.save(closet);
            }

            return new ResponseEntity<>(closet, HttpStatus.OK);

        } else {
            List<String> productList = new ArrayList<>();
            productList.add(productId);
            Closet newCloset = new Closet(username, productList);
            clothesRepository.save(newCloset);

            return new ResponseEntity<>(newCloset, HttpStatus.CREATED);
        }
    }


    /*@DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeFromCloset(@PathVariable String id) {
        Optional<Closet> optionalClothes = clothesRepository.findById(id);
        if (optionalClothes.isPresent()) {
            Closet closet = optionalClothes.get();
            clothesRepository.delete(closet);
            return new ResponseEntity<>("Item successfully removed", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
    }*/

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeFromCloset(@PathVariable String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("productIds").is(id));

        Update update = new Update();
        update.pull("productIds", id);

        // Closet 객체가 업데이트 되었는지 확인하기 위해 결과값을 받습니다.
        UpdateResult result = mongoTemplate.updateFirst(query, update, Closet.class);

        if (result.getModifiedCount() > 0) { // getModifiedCount() 메서드는 영향 받은 문서의 수를 반환합니다.
            return new ResponseEntity<>("Item successfully removed", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<Closet> getCloset(@PathVariable String username) {
        Optional<Closet> optionalCloset = clothesRepository.findByUsername(username);
        if (optionalCloset.isPresent()) {
            Closet closet = optionalCloset.get();
            return new ResponseEntity<>(closet, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
