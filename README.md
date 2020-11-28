# Jungschar-Infoscreen

## Beschreibung

"Jungschar-Infoscreen" ist ein Software-Produkt, welches die Verwaltung und Durchführung einer Spielestadt oder ähnlichen Aktivitäten erleichtert. Es gibt eine Ansicht für Kinder, wo sie aktuelle Informationen, wie das Wetter, die aktuelle Uhrzeit oder Bilder der vergangenen Woche, ansehen können. Die Inhalte können von Kindern auch während der Aktion erstellt und bedient werden. "Jungschar-Infoscreen" richtet sich an GruppenleiterInnen und Kinder. Das Ziel ist es, bei der Organisation bzw. Durchführung unterstützt zu werden. Aufgebaut ist die ganze Anwendung in 2 Fenster, das Präsentationsfenster, in dem die Kinder den Inhalt sehen und das Verwaltungsfenster, in dem man die Inhalte verwalten und bearbeiten kann.

## Installation

Für die Erstinstallation ist Internet erforderlich. 

"Jungschar-Infoscreen" kann [hier](https://dorfingerjonas.at/jungschar-infoscreen/download) heruntergeladen werden.

Während die Dateien herunterladen öffnen Sie ein Terminal-Fenster, um zu sehen, ob die Software bereits installiert ist oder nicht.

**Terminal öffnen - Windows**

``Win + R`` und ``cmd`` in das geöffnete Fenster eingeben, mit ``Enter`` bestätigen.

**Terminal öffnen - macOS**

``CMD + Leertaste`` und ``Terminal`` in die Suchleiste eingeben, mit ``Enter `` bestätigen.

<br>

Geben Sie ``node --version`` ein, um zu überprüfen ob Sie ``nodeJS`` bereits installiert haben. 

Wenn Sie die Antwort ``v10.x.x`` oder eine höhere Versionsnummer ist, können Sie den nächsten Schritt überspringen.

> Info: ``x`` steht in diesem Fall für eine beliebige Zahl

Öffnen Sie https://nodejs.org/ in einem Web-Browser und folgen Sie den Installationsanweisungen für die LTS Version. Wenn Sie diese Schritte absolviert haben, können Sie erneut im Terminal ``node --version`` eingeben, um sicherzustellen, dass die Installation erfolgreich war.

In der Zwischenzeit sollten die Dateien heruntergeladen sein. Entpacken Sie den Ordner nun an Ihrer gewünschten Stelle. Anschließend öffnen Sie das Verzeichnis und führen die ``start.cmd`` Datei mit einem Doppelklick aus. 

![start](./docs/start.png)

Steht am Ende dieses Fensters ``http://localhost:3000/`` ist "Jungschar-Infoscreen" erfolgreich installiert und gestartet. Sie können nun im Browser ``http://localhost:3000/`` aufrufen und "Jungschar-Infoscreen" verwenden.

**Achtung:** Dieses Fenster darf nicht geschlossen werden, solange der "Jungschar-Infoscreen" verwendet werden soll. Wenn dieses Fenster geschlossen wird, funktioniert die Software nicht mehr. Wenn Sie das Fenster geschlossen haben, können Sie es wieder mit einem Doppelklick auf die ``start.cmd`` - Datei öffnen.

## Bedienung

### Allgemeine Struktur

Die Software ist auf mehrere Unterpunkte aufgeteilt:

- Dashboard
  - diverse Möglichkeiten Präsentationsfenster steuern
  - Vorschau des Präsentationsfensters
- Job Verteilung
- Jobs bearbeiten
- News bearbeiten
- Wetter bearbeiten
- Medieninhalte verwalten

### Dashboard

Auf dem Dashboard sind 4 Buttons mit denen man das Präsentationsfenster steuern kann. Zuerst muss man das Fenster öffnen ("Präsentationsfenster öffnen"), das Fenster öffnet sich automatisch. Es wird empfohlen das Fenster im Vollbildmodus zu verwenden, dafür können Sie die Taste ``F11`` drücken. Um den Vollbildmodus zu verlassen, erneut ``F11`` drücken.

Mit dem Button "Präsentationsfenster schließen" können Sie das geöffnete Fenster schließen, oder Sie klicken oben rechts auf das rote ``X``.

Wenn Sie auf "Präsentation aktualisieren" drücken, wird der gesamte Inhalt aktualisiert und neu angezeigt.

Mit "Job Ansicht aktivieren" aktiviert sich die Job Ansicht im Präsentationsfenster. Mit dem selben Button kann man die Job Ansicht auch wieder deaktivieren.

Die Vorschau, wie das Präsentationsfenster ausschauen könnte, wird weiter unten angezeigt. Das Präsentationsfenster ist nicht mit der Vorschau synchronisiert.

![dashboard](./docs/dashboard.png)

### Job Verteilung

In der Job Verteilung können Sie die Arbeitsplätze vergeben. In diesem Fenster kann auch die Job Ansicht (de-)aktiviert werden. Sie können eine Stelle vergeben, indem Sie auf eine grüne Person klicken, das Symbol wird anschließend rot. Ein einzelner Arbeitsplatz wird mit einem klick auf eine rote Person freigegeben. Sie können mit dem "Zurücksetzen" Button alle Jobs wieder freigeben.

![job_verteilung](./docs/job_verteilung.png)

### Jobs bearbeiten

Hier können Sie die Währung und die Jobs ändern. Um etwas zu bearbeiten klicken Sie auf den "Bearbeiten"-Button. Um einen neuen Eintrag zu erstellen klicken Sie oben rechts auf den "Job erstellen" Button. Es öffnet sich ein Fenster, wo Sie die Informationen eintragen können.

![jobs_bearbeiten](./docs/jobs_bearbeiten.png)

### News bearbeiten

News werden unten im Präsentationfenster angezeigt. Sie wechseln alle 10 Sekunden und neue Meldungen können mit dem Button "News erstellen" angelegt werden.

![news_bearbeiten](./docs/news_bearbeiten.png)

### Wetter bearbeiten

Für die aktuellen Wetterdaten ist eine Internetverbindung erforderlich! Wenn Sie keine Internetverbindung haben oder verwenden möchten, können Sie den nächsten Punkt überspringen und lokale Wetterdaten verwenden. 

#### Wetterdaten aus dem Internet

Um die aktuellen Wetterdaten ihrer Stadt zu erhalten, geben Sie den Namen der Stadt ein, es kann auch hilfreich sein, eine größere Stadt in der Nähe auszuwählen. Im nächsten Schritt erstellen Sie sich einen Account auf https://openweathermap.org und folgen den Anweisungen auf der Website, um sich einen eigenen API-Key für die kostenlose Version zu erstellen. Wenn Sie Probleme dabei haben, können Sich mich kontaktieren. Ich kann kostenlos einen Key zur Verfügung stellen, den Sie anschließend in das Feld für den API-Key einfügen.

#### Lokale Wetterdaten

Um das lokale Wetter zu aktivieren, müssen Sie den Haken bei "Individuelles Wetter aktiv" setzen. Beachten Sie, dass Sie zuerst den Bearbeitungsmodus aktivieren. Anschließend können Sie individuelle Wetterdaten eintragen und das Icon auswählen.

![wetter_bearbeiten](./docs/wetter_bearbeiten.png)

### Medieninhalte verwalten

Hier können Sie die angezeigten Videos uns Bilder bearbeiten. Wenn Sie Medien hochladen, werden die Bilder automatisch in den Bilderabschnitt weiter unten verschoben und die Videos in den Videoabschnitt. Die Videos sind die am größten angezeigten Medien im Präsentationsfenster.![medien](./docs/medien.png)

## FAQ

### Ist für die Anwendung eine Internet Verbindung erforderlich?

Ja und nein, grundsätzlich ist das Programm so konzeptioniert, dass es ohne einer Internetverbindung funktioniert. Eine Internetverbindung ist nur für die Installation und das Wetter notwendig. Für das Wetter gibt es allerdings die Funktion für individuales Wetter, dafür ist kein Internet erforderlich.

### Können Kosten anfallen?

Nein, "Jungschar-Infoscreen" ist zu 100% kostenfrei.



**Bei weiteren Fragen, schreiben Sie mir bitte eine E-Mail!**

## Kontakt

Jonas Dorfinger

E-Mail: jungschar-infoscreen@dorfingerjonas.at

Telefonnummer auf Anfrage

<hr>

Copyright © 2020, [Jonas Dorfinger](https://dorfingerjonas.at/). Diese Software ist [MIT lizenziert](./LICENSE).

