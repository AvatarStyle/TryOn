package project.avatar.api.controller.fitting;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/fitting")
public class fittingController {

    @PostMapping("/upload")
    public ResponseEntity uploadFile(@RequestParam("modelImage") MultipartFile modelImage, @RequestParam("clothesImage") MultipartFile clothesImage){
        
        return new ResponseEntity(HttpStatus.OK);
    }
}