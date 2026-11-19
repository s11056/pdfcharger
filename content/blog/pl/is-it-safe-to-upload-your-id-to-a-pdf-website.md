---
title: Czy Bezpiecznie Jest Wysłać Paszport lub Dowód na Stronę z PDF?
description: Zanim wyślesz skan paszportu lub dowodu na darmową stronę PDF, przeczytaj to. Prawdziwe ryzyko, co sprawdzić i bezpieczniejszy sposób.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Założenie konta w banku, nowa praca, wynajem mieszkania, wniosek o wizę: prędzej czy później ktoś poprosi o „kopię dowodu, obie strony, na jednej stronie, w PDF". Robisz zdjęcie dokumentu, szukasz darmowego narzędzia PDF, wysyłasz oba zdjęcia i pobierasz wynik.

To zupełnie normalne. Ale kopia dokumentu tożsamości to jedna z najcenniejszych rzeczy, jakie wysyłasz przez internet. Warto wiedzieć, dokąd trafiają te zdjęcia.

## Co się dzieje, gdy wysyłasz dowód na stronę z PDF

Większość narzędzi PDF online przetwarza pliki na własnych serwerach:

1. **Zdjęcia trafiają na serwery usługi**, często w innym kraju.
2. **Są tam przechowywane podczas tworzenia PDF**, a często także później. Niektóre usługi trzymają pliki godzinę, inne dzień lub dłużej.
3. **Kopie mogą trafić do kopii zapasowych i logów**, których nigdy nie zobaczysz.

Większość usług działa uczciwie. Ale każde miejsce, w którym leży Twój dowód, to kolejne miejsce, z którego może wyciec: włamanie, źle skonfigurowany magazyn danych, pracownik z za szerokimi uprawnieniami. A w przeciwieństwie do hasła nie zmienisz numeru PESEL ani twarzy.

## Dlaczego wyciek kopii dowodu jest groźny

Wyraźny skan zawiera wszystko, czego oszust potrzebuje, by podszyć się pod Ciebie: imię i nazwisko, datę urodzenia, zdjęcie, numer dokumentu, często też adres. Z tym może próbować zaciągnąć pożyczkę lub założyć konto na Twoje dane, przejść weryfikację „prześlij dokument" w aplikacjach, kupić abonament telefoniczny czy wynająć mieszkanie. Możesz się o tym dowiedzieć dopiero od windykatora.

## Pięć pytań, zanim cokolwiek wyślesz

1. **Czy plik jest przetwarzany na moim urządzeniu, czy na ich serwerze?** Jeśli nie jest to jasne, załóż, że jest wysyłany.
2. **Jak długo go przechowują?** „Usuwamy po godzinie" jest lepsze niż nic, ale „nigdy nie wysyłamy" jest jeszcze lepsze.
3. **Kto prowadzi stronę?** Czy jest nazwa firmy, polityka prywatności i kontakt?
4. **Czy potrzebne jest konto?** Rejestracja łączy Twój dowód z Twoim adresem e-mail w ich systemie.
5. **Czy mogę sprawdzić, co robi narzędzie?** Kod narzędzi open source może sprawdzić każdy.

## Bezpieczniej: przygotuj kopię w przeglądarce

Nie musisz niczego wysyłać, by umieścić obie strony dowodu na jednej stronie. [Kompozytor dokumentów PDFCharger](/pl/tools/passport-id-composer/) działa w przeglądarce, więc zdjęcia nie opuszczają Twojego urządzenia:

1. **Zrób wyraźne zdjęcia przodu i tyłu**, przy dobrym świetle i bez odblasków. Przytnij każde zdjęcie do krawędzi karty.
2. **Otwórz [kompozytor dokumentów](/pl/tools/passport-id-composer/)** i dodaj oba zdjęcia. Działają JPG, PNG i PDF.
3. **Dodaj znak wodny** (patrz niżej).
4. **Utwórz PDF i pobierz go.** Dostaniesz jedną stronę A4 z przodem na górze i tyłem na dole, każdy w rzeczywistym rozmiarze standardowej karty identyfikacyjnej (85,6 × 54 mm), więc wydruk też będzie poprawny.

## Zawsze dodawaj znak wodny do kopii

Znak wodny to najprostszy sposób, by skradziona kopia była prawie bezużyteczna. Napisz, *dla kogo* jest kopia, *w jakim celu* i *kiedy*, na przykład:

> Copy for apartment rental only - 19.11.2026

Jeśli ta kopia pojawi się gdzie indziej, nadużycie będzie oczywiste. Narzędzie powtarza tekst ukośnie na całej stronie z niskim kryciem (15%), zakrywając wszystko bez utrudniania odczytu.

**Uwaga:** tekst powinien być krótki, zawierać tylko litery łacińskie bez polskich znaków oraz cyfry.

## Udostępniaj tylko to, co konieczne

- **Zapytaj, czy potrzebne są obie strony.** Czasem wystarczy przód ze zdjęciem.
- **Zakryj to, co niepotrzebne.** Jeśli instytucja potwierdzi, że jakaś informacja jest zbędna, usuń ją naprawdę narzędziem [Zaczernij PDF](/pl/tools/redact-pdf/), zamiast tylko przykrywać prostokątem. Niektóre instytucje, zwłaszcza banki, muszą widzieć cały dokument, więc zapytaj wcześniej.
- **Zabezpiecz plik hasłem przed wysłaniem e-mailem.** [Zaszyfruj PDF](/pl/tools/encrypt-pdf/) dodaje szyfrowanie AES 256-bit w przeglądarce. Hasło przekaż inną drogą, SMS-em lub telefonicznie, nigdy w tym samym e-mailu.

## Posprzątaj po wszystkim

Twoja kopia leży teraz pewnie w kilku miejscach: w galerii telefonu i jej kopii w chmurze, w folderze Pobrane, w wysłanych e-mailach i w komunikatorze, którego użyłeś. Usuń niepotrzebne kopie, gdy sprawa zostanie załatwiona. Im mniej kopii, tym mniejsze ryzyko.

## W skrócie

- Przygotowuj kopie dokumentów w przeglądarce [kompozytorem dokumentów](/pl/tools/passport-id-composer/), bez wysyłania czegokolwiek.
- Dodawaj znak wodny: dla kogo, w jakim celu i data.
- Udostępniaj tylko to, co konieczne, i zabezpieczaj plik hasłem.
- Usuń rozproszone kopie po wszystkim.
