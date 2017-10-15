# wybornie.org - frontend

To repozytorium zawiera kod, z którego generowana jest aplikacja uruchamiana po stronie użytkownika po wejściu na stronę http://wybornie.org/.

Aplikacja wyświetla dane pobrane z serwera - [backend](https://github.com/fraunos/wybornieorg-backend).


TODO:
- [x] głosowanie na projekty z wyświetlaniem wyników
- [ ] persistent storage - zapisywanie pobranych z serwera i od użytkownika danych w localStorage cache (dodanie do backendu daty aktualizacji, żeby sprawdzać kiedy należy pobrać ponownie dane na klienta)
- [ ] sortowanie i wyszukiwanie projektów (po frekwencji, numerze, dacie głosowania, liczbie oddanych głosów)
- [x] sortowanie statystyk posłów (wg. zgodności)
- [ ] opisy projektów (nazwy zwyczajowe i artykuły w sieci)
- [ ] frekwencja posłów
- [ ] szybka ankieta - najbardziej popularne projekty
- [x] widok układu parlamentu zamiast okręgów
- [ ] zaznaczanie projektów, na które został oddany głos
- [ ] responsywność - dostosowanie do różnych ekranów
- [x] lepszy wygląd (nowe logo, struktura aplikacji)
- [ ] portrety posłów
- [ ] animacje przy głosowaniu i ładowaniu statystyk
- [x] zaznacznie nieobecności na szaro, wstrzymania się na fioletowo
