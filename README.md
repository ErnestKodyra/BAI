# FinManager

## Interfejs
**Figma:** [Projekt](https://www.figma.com/file/tQ8YzVV6qm6BffaabQVOaT/VueApp?type=design&node-id=0%3A1&mode=design&t=qab1VNXqR0Ig3nz4-1) / [Prototyp](https://www.figma.com/proto/tQ8YzVV6qm6BffaabQVOaT/VueApp?type=design&node-id=3-7&t=yFqBzfTVJ9b6nJ6t-1&scaling=scale-down&page-id=0%3A1&mode=design)

## Opis aplikacji
FinManager jest aplikacją internetową służącą do symulacji gry na giełdzie. Aplikacja umożliwia handlowanie fikcyjnymi papierami wartościowymi. Po założeniu konta w FinManagerze użytkownik otrzymuje bazową kwotę na start, którą może inwestować w papiery wartościowe. Użytkownik może wybrać spośród kilku dostępnych kategorii papierów, różniących się zmiennością cen, ryzykiem i progiem wejścia. Aplikacja pełni rolę gry edukacyjnej i dodatkowo posiada sekcje ze strategiami i podstawową wiedzą nt. giełdy.

## Opis techniczny
FinManager działa w oparciu o technologie webowe, w szczególności framework Vue.js w wersji 3. Do zarządzania stanem aplikacji wykorzystano bibliotekę Vuex, natomiast poruszanie się po stronach jest możliwe dzięki komponentowi Vue Router. Do stworzenia innych komponentów aplikacji zastosowano Composition API.

## Widoki
>   * Widok startowy
>   * Widok logowania
>   * Widok rejestracji
>   * Widok strony głównej
>   * Widok profilu użytkownika
>   * Widok symulacji giełdowej
>   * Widok bazy wiedzy
>   * Widok informacji o aplikacji

## Funkcje aplikacji
>   * Logowanie do serwisu
>   * Rejestracja konta użytkownika
>   * Konfiguracja konta użytkownika
>   * **Symulacja giełdowa**
>       * Wyświetlenie posiadanych papierów i ich wartości na ekranie głównym
>       * Kalkulowanie strat/zysków na obecną chwilę
>       * Wyświetlenie szczegółów o konkretnym papierze wartościowym wraz z wykresem ceny
>       * Możliwość kupna lub sprzedaży określonego papieru wartościowego
>       * Możliwość wyboru pomiędzy kilkoma kategoriami papierów wartościowych
>   * **Baza wiedzy**
>       * Przeprowadzenie użytkownika przez samouczek korzystania z symulacji i grania na giełdzie
>       * Wyświetlenie użytkownikowi informacji na dany temat dotyczący giełdy
>       * Pokazanie przykładów użycia strategii z pomocą wizualizacji