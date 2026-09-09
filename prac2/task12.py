price = float(input("Введите стоимость товара: "))
quantity = int(input("Введите количество единиц: "))
discount = float(input("Введите процент скидки: "))

initial_cost = price * quantity
discount_amount = initial_cost * discount / 100
final_cost = initial_cost - discount_amount

print("Первоначальная стоимость:", initial_cost)
print("Сумма скидки:", discount_amount)
print("Итоговая стоимость:", final_cost)