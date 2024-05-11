# FinManager

## Interfejs
**Figma:** [Projekt](https://www.figma.com/file/tQ8YzVV6qm6BffaabQVOaT/VueApp?type=design&node-id=0%3A1&mode=design&t=qab1VNXqR0Ig3nz4-1) / [Prototyp](https://www.figma.com/proto/tQ8YzVV6qm6BffaabQVOaT/VueApp?type=design&node-id=3-7&t=yFqBzfTVJ9b6nJ6t-1&scaling=scale-down&page-id=0%3A1&mode=design)

## Opis aplikacji
Aplikacja służy do demonstracji przykładowego programu dla klientów brokera. Umożliwia ona symulowanie handlu fikcyjnymi papierami wartościowymi w celach demonstracyjnych. Po założeniu konta użytkownik otrzymuje bazową kwotę na start, którą może manipulować kupując lub sprzedając fikcyjne papiery wartościowe. W zakładce Giełda dostępna jest lista potencjalnych jednostek inwestycyjnych oraz wykresy na żywo reprezentujące zmianę cen papierów wartościowych. Użytkownik ma dostęp do danych historycznych swoich inwestycji i ich rentowności w zakładce Portfel.

## Opis techniczny
Aplikacja działa w oparciu o technologie webowe, w szczególności framework Vue.js w wersji 3. Do zarządzania stanem aplikacji wykorzystano bibliotekę Vuex, natomiast poruszanie się po stronach jest możliwe dzięki komponentowi Vue Router. Do stworzenia innych komponentów aplikacji zastosowano Composition API.

## Widoki
>   * Widok startowy
>   * Widok logowania
>   * Widok rejestracji
>   * Widok portfela
>   * Widok giełdy
>   * Widok profilu użytkownika

## Funkcje aplikacji
>   * Logowanie do serwisu
>   * Rejestracja konta użytkownika
>   * Konfiguracja konta użytkownika
>   * **Portfel**
>       * Wyświetlanie posiadanych środków pieniężnych
>       * Wyświetlanie całkowitej straty/zysku
>       * Wyświetlanie wolnych środków pieniężnych
>       * Wyświetlanie aktualnie otwartych inwestycji
>       * Wyświetlanie historii transakcji w określonych datach
>       * Kalkulowanie strat/zysków w określonym przedziale czasowym
>   * **Giełda**
>       * Wyświetlanie listy dostępnych papierów wartościowych
>       * Wyświetlanie szczegółów o konkretnym papierze wartościowym wraz z wykresem na żywo ceny
>       * Możliwość kupna lub sprzedaży określonego papieru wartościowego
>       * Możliwość wyboru pomiędzy kilkoma kategoriami papierów wartościowych
>       * Ustalenie dolnego lub górnego limitu kwoty którego osiągniecie skutkuje powiadomieniem