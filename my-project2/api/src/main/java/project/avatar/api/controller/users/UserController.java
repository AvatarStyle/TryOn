package project.avatar.api.controller.users;

//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.avatar.api.entity.Users;
import project.avatar.api.repo.UserRepository;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
//import project.avatar.api.repo.UserJpaRepo;


@Api(tags = {"2. User"})
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Optional<Users> optionalUser = userRepository.findByUid(loginRequest.getUid());
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                session.setAttribute("user", user);
                Map<String, String> responseBody = new HashMap<>();
                responseBody.put("message", "로그인에 성공 했습니다");
                responseBody.put("username", user.getName()); // 추가된 코드
                return ResponseEntity.ok(responseBody);
            } else {
                Map<String, String> responseBody = new HashMap<>();
                responseBody.put("message", "틀린 비밀번호입니다");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
            }
        } else {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "유저의 정보를 찾을 수 없습니다");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.removeAttribute("user");
        return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody SignupRequest signupRequest) {
        Optional<Users> optionalUser = userRepository.findByUid(signupRequest.getUid());
        if (optionalUser.isPresent()) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "User already exists");
            return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
        } else {
            Users newUser = new Users();
            newUser.setUid(signupRequest.getUid());
            newUser.setPassword(signupRequest.getPassword());
            newUser.setName(signupRequest.getName());

            userRepository.save(newUser);

            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Signup successful");

            return new ResponseEntity<>(responseBody, HttpStatus.CREATED);
        }
    }
}