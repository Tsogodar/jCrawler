// Klasa pobierająca niezbędne informacje od użytkownika
class Wrapper {
    // Konstruktor uruchamiany po stworzeniu instancji klasy Wrapper
    constructor() {
        const readline = require('readline')
        const io = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        //Pobranie danych od użytkownika
        io.question('Filename: ', (filename) => {
            io.question('Fields (separated by space): ', (fields) => {
                this.fields = fields.split(' ')
                io.question('Save crawled data separated by new line? <\y/n>: ', (newLine) => {
                    // Wywołanie klasy Wrapper wraz z wymaganymi metodami
                    console.time('Done in')
                    let crawler = new Crawler()
                    let loadData = crawler.load(filename)
                    crawler.save(JSON.parse(loadData), this.fields,  newLine)
                    console.timeEnd('Done in')
                    io.close()
                })
            })
        })
    }
}
// Klasa obsługująca ładowanie, parsowanie, wyciąganie danych i zapis do pliku
class Crawler {
    // Wczytanie danych z pliku json
    load(filename) {
        this.fs = require('fs')
        this.path = require('path')
        let file = this.fs.readFileSync(this.path.join(__dirname, filename), 'utf8')
        return this.data = file
    }
    // Zapis wybranych danych w nowym pliku output.json
    save(fetchedData,fields, newLine) {
        this.fs.writeFileSync('output.json', JSON.stringify(fetchedData, fields, newLine==='y' || newLine==='Y' ? 1 : null), (err) => {
            if (err) throw err
        })
    }
}
// Wywołanie klasy Wrapper
new Wrapper()