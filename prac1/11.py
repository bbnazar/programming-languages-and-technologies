price = float(input())
quantity = int(input())

cost = price * quantity
nds = cost * 0.12
total = cost + nds

print("Стоимость:", cost)
print("НДС:", nds)
print("Итоговая стоимость:", total)

