package project.avatar.api.controller.products;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Item {
    private Long productId;
    private String image;
    private String title;
    private String category1;
    private String mallname;
    private int lprice;
    private String link;
}

