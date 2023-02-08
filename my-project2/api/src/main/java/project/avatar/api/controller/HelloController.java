package project.avatar.api.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {

    @GetMapping(value = "/helloworld/string")
    @ResponseBody
    public String helloworldString(){
        return "helloworld";
    }

    @GetMapping(value = "/helloworld/json")
    @ResponseBody
    public Hello helloworldJson(){
        Hello hello = new Hello();
        hello.message = "helloworld";
        return hello;
    }

    @RequestMapping(value = "/helloworld/page")
    public String HelloWorldPage(){
        return "helloworld";
    }

    @Getter
    @Setter
    public static class Hello{
        private String message;
    }
}