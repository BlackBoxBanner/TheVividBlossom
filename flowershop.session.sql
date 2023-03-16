CREATE VIEW $ { fullName } AS
select `u`.`id` AS `user_id`,
  `u`.`first_name` AS `first_name`,
  `u`.`last_name` AS `last_name`,
  `u`.`email` AS `email`,
  `a`.`address_line1` AS `address_line1`,
  `a`.`address_line2` AS `address_line2`,
  `a`.`subDistrict` AS `subDistrict`,
  `a`.`district` AS `district`,
  `a`.`province` AS `province`,
  `a`.`zipcode` AS `zipcode`,
  `up`.`card_type` AS `card_type`,
  `up`.`provider` AS `provider`,
  `up`.`name_on_card` AS `name_on_card`,
  `up`.`card_number` AS `card_number`,
  `up`.`cvv` AS `cvv`,
  `up`.`card_expiry` AS `card_expiry`,
  `od`.`id` AS `order_id`,
  `od`.`status_id` AS `status_id`,
  `od`.`subtotal_amount` AS `subtotal_amount`,
  `od`.`product_discout` AS `product_discout`,
  `od`.`tax_amount` AS `tax_amount`,
  `od`.`shipping_id` AS `shipping_id`,
  `od`.`shipping_date` AS `shipping_date`,
  `od`.`total_amount` AS `total_amount`,
  `od`.`admin_UserId` AS `admin_UserId`,
  `od`.`status` AS `status`
from (
    (
      (
        `midtermproduction`.`user` `u`
        left join `midtermproduction`.`address` `a` on((`u`.`id` = `a`.`user_id`))
      )
      left join `midtermproduction`.`user_payment` `up` on((`u`.`id` = `up`.`user_id`))
    )
    left join `midtermproduction`.`order_details` `od` on((`u`.`id` = `od`.`user_id`))
  )

