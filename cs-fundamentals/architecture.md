## Lözung:

- Bakery orders: Hier kann man einen Monolithen oder eine Layered Architecture verwenden. Dafür sprechen die gleichmäßige Belastung und die kleine Anzahl von Entwicklern.

- Concert tickets: Hier ist ein Serverless-Ansatz sinnvoll, damit das System auch bei hohen Lastspitzen problemlos funktioniert.

- Online marketplace: Hier arbeiten verschiedene Teams parallel. Das Produkt besteht aus unabhängigen Teilen, die auch unabhängig voneinander funktionieren müssen. Deshalb sind Microservices sinnvoll.

## Kompromiss:

- Bakery: Ein Monolith ist ein Kompromiss. Es ist schwieriger, ihn zu warten, wenn das Projekt wächst.

- Concert tickets: Ein möglicher Nachteil ist, dass wir für Cold Starts bezahlen, auch wenn zwischen den Konzerten wenig Aktivität herrscht.

- Online marketplace – Kompromiss: Wenn die Microservices unabhängig voneinander arbeiten und eigene Datenbanken haben, müssen die Daten ständig synchronisiert werden.

## Change in the product:

- Bakery: Wenn das Produkt wächst und es mehr Bestellungen gibt und/oder die Bestellungen unregelmäßig kommen, kann es sinnvoll sein, einzelne Teile auf Serverless umzustellen.

- Concert tickets: Bei einer weiteren Entwicklung und zunehmenden Komplexität des Produkts kann es sinnvoll sein, einige Teile als Microservices umzusetzen.

- Online marketplace: Auch hier sollte man bei stark wachsender Nachfrage (besonders wenn das Produkt in verschiedenen Ländern angeboten wird) die Möglichkeit in Betracht ziehen, das Projekt auf Serverless umzustellen.
