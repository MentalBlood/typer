  let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches
  function windowWidth() { return (window.innerWidth > 0) ? window.innerWidth : screen.width; }
  function windowHeight() { return (window.innerHeight > 0) ? window.innerHeight : screen.height; }
  if (isMobile) {
    document.write('<p>You need to use wider window to access this site<\p>\
                    <p>Refresh the page to repeat check<\p>\
                    <p><img src=https://i.etsystatic.com/10309712/r/il/f79319/1880485186/il_fullxfull.1880485186_d87g.jpg class="img-responsive"\><\p>')
  }
  else {

  let allFontsNames = ['Abel', 'Abhaya Libre', 'Abril Fatface', 'Aclonica', 'Acme', 'Actor', 'Adamina', 'Advent Pro', 'Aguafina Script', 'Akronim', 'Aladin', 'Alata', 'Alatsi', 'Aldrich', 'Alef', 'Alegreya', 'Alegreya SC', 'Alegreya Sans', 'Alegreya Sans SC', 'Aleo', 'Alex Brush', 'Alfa Slab One', 'Alice', 'Alike', 'Alike Angular', 'Allan', 'Allerta', 'Allerta Stencil', 'Allura', 'Almarai', 'Almendra', 'Almendra Display', 'Almendra SC', 'Amarante', 'Amaranth', 'Amatic SC', 'Amethysta', 'Amiko', 'Amiri', 'Amita', 'Anaheim', 'Andada', 'Andika', 'Angkor', 'Annie Use Your Telescope', 'Anonymous Pro', 'Antic', 'Antic Didone', 'Antic Slab', 'Anton', 'Arapey', 'Arbutus', 'Arbutus Slab', 'Architects Daughter', 'Archivo', 'Archivo Black', 'Archivo Narrow', 'Aref Ruqaa', 'Arima Madurai', 'Arimo', 'Arizonia', 'Armata', 'Arsenal', 'Artifika', 'Arvo', 'Arya', 'Asap', 'Asap Condensed', 'Asar', 'Asset', 'Assistant', 'Astloch', 'Asul', 'Athiti', 'Atma', 'Atomic Age', 'Aubrey', 'Audiowide', 'Autour One', 'Average', 'Average Sans', 'Averia Gruesa Libre', 'Averia Libre', 'Averia Sans Libre', 'Averia Serif Libre', 'B612', 'B612 Mono', 'Bad Script', 'Bahiana', 'Bahianita', 'Bai Jamjuree', 'Baloo', 'Baloo Bhai', 'Baloo Bhaijaan', 'Baloo Bhaina', 'Baloo Chettan', 'Baloo Da', 'Baloo Paaji', 'Baloo Tamma', 'Baloo Tammudu', 'Baloo Thambi', 'Balthazar', 'Bangers', 'Barlow', 'Barlow Condensed', 'Barlow Semi Condensed', 'Barriecito', 'Barrio', 'Basic', 'Baskervville', 'Battambang', 'Baumans', 'Bayon', 'Be Vietnam', 'Bebas Neue', 'Belgrano', 'Bellefair', 'Belleza', 'BenchNine', 'Bentham', 'Berkshire Swash', 'Beth Ellen', 'Bevan', 'Big Shoulders Display', 'Big Shoulders Text', 'Bigelow Rules', 'Bigshot One', 'Bilbo', 'Bilbo Swash Caps', 'BioRhyme', 'BioRhyme Expanded', 'Biryani', 'Bitter', 'Black And White Picture', 'Black Han Sans', 'Black Ops One', 'Blinker', 'Bokor', 'Bonbon', 'Boogaloo', 'Bowlby One', 'Bowlby One SC', 'Brawler', 'Bree Serif', 'Bubblegum Sans', 'Bubbler One', 'Buda', 'Buenard', 'Bungee', 'Bungee Hairline', 'Bungee Inline', 'Bungee Outline', 'Bungee Shade', 'Butcherman', 'Butterfly Kids', 'Cabin', 'Cabin Condensed', 'Cabin Sketch', 'Caesar Dressing', 'Cagliostro', 'Cairo', 'Caladea', 'Calistoga', 'Calligraffitti', 'Cambay', 'Cambo', 'Candal', 'Cantarell', 'Cantata One', 'Cantora One', 'Capriola', 'Cardo', 'Carme', 'Carrois Gothic', 'Carrois Gothic SC', 'Carter One', 'Catamaran', 'Caudex', 'Caveat', 'Caveat Brush', 'Cedarville Cursive', 'Ceviche One', 'Chakra Petch', 'Changa', 'Changa One', 'Chango', 'Charm', 'Charmonman', 'Chathura', 'Chau Philomene One', 'Chela One', 'Chelsea Market', 'Chenla', 'Cherry Cream Soda', 'Cherry Swash', 'Chewy', 'Chicle', 'Chilanka', 'Chivo', 'Chonburi', 'Cinzel', 'Cinzel Decorative', 'Clicker Script', 'Coda', 'Coda Caption', 'Codystar', 'Coiny', 'Combo', 'Comfortaa', 'Coming Soon', 'Concert One', 'Condiment', 'Content', 'Contrail One', 'Convergence', 'Cookie', 'Copse', 'Corben', 'Cormorant', 'Cormorant Garamond', 'Cormorant Infant', 'Cormorant SC', 'Cormorant Unicase', 'Cormorant Upright', 'Courgette', 'Courier Prime', 'Cousine', 'Coustard', 'Covered By Your Grace', 'Crafty Girls', 'Creepster', 'Crete Round', 'Crimson Pro', 'Crimson Text', 'Croissant One', 'Crushed', 'Cuprum', 'Cute Font', 'Cutive', 'Cutive Mono', 'DM Sans', 'DM Serif Display', 'DM Serif Text', 'Damion', 'Dancing Script', 'Dangrek', 'Darker Grotesque', 'David Libre', 'Dawning of a New Day', 'Days One', 'Dekko', 'Delius', 'Delius Swash Caps', 'Delius Unicase', 'Della Respira', 'Denk One', 'Devonshire', 'Dhurjati', 'Didact Gothic', 'Diplomata', 'Diplomata SC', 'Do Hyeon', 'Dokdo', 'Domine', 'Donegal One', 'Doppio One', 'Dorsa', 'Dosis', 'Dr Sugiyama', 'Duru Sans', 'Dynalight', 'EB Garamond', 'Eagle Lake', 'East Sea Dokdo', 'Eater', 'Economica', 'Eczar', 'El Messiri', 'Electrolize', 'Elsie', 'Elsie Swash Caps', 'Emblema One', 'Emilys Candy', 'Encode Sans', 'Encode Sans Condensed', 'Encode Sans Expanded', 'Encode Sans Semi Condensed', 'Encode Sans Semi Expanded', 'Engagement', 'Englebert', 'Enriqueta', 'Erica One', 'Esteban', 'Euphoria Script', 'Ewert', 'Exo', 'Exo 2', 'Expletus Sans', 'Fahkwang', 'Fanwood Text', 'Farro', 'Farsan', 'Fascinate', 'Fascinate Inline', 'Faster One', 'Fasthand', 'Fauna One', 'Faustina', 'Federant', 'Federo', 'Felipa', 'Fenix', 'Finger Paint', 'Fira Code', 'Fira Mono', 'Fira Sans', 'Fira Sans Condensed', 'Fira Sans Extra Condensed', 'Fjalla One', 'Fjord One', 'Flamenco', 'Flavors', 'Fondamento', 'Fontdiner Swanky', 'Forum', 'Francois One', 'Frank Ruhl Libre', 'Freckle Face', 'Fredericka the Great', 'Fredoka One', 'Freehand', 'Fresca', 'Frijole', 'Fruktur', 'Fugaz One', 'GFS Didot', 'GFS Neohellenic', 'Gabriela', 'Gaegu', 'Gafata', 'Galada', 'Galdeano', 'Galindo', 'Gamja Flower', 'Gayathri', 'Gelasio', 'Gentium Basic', 'Gentium Book Basic', 'Geo', 'Geostar', 'Geostar Fill', 'Germania One', 'Gidugu', 'Gilda Display', 'Girassol', 'Give You Glory', 'Glass Antiqua', 'Glegoo', 'Gloria Hallelujah', 'Goblin One', 'Gochi Hand', 'Gorditas', 'Gothic A1', 'Goudy Bookletter 1911', 'Graduate', 'Grand Hotel', 'Gravitas One', 'Great Vibes', 'Grenze', 'Griffy', 'Gruppo', 'Gudea', 'Gugi', 'Gupter', 'Gurajada', 'Habibi', 'Halant', 'Hammersmith One', 'Hanalei', 'Hanalei Fill', 'Handlee', 'Hanuman', 'Happy Monkey', 'Harmattan', 'Headland One', 'Heebo', 'Henny Penny', 'Hepta Slab', 'Herr Von Muellerhoff', 'Hi Melody', 'Hind', 'Hind Guntur', 'Hind Madurai', 'Hind Siliguri', 'Hind Vadodara', 'Holtwood One SC', 'Homemade Apple', 'Homenaje', 'IBM Plex Mono', 'IBM Plex Sans', 'IBM Plex Sans Condensed', 'IBM Plex Serif', 'IM Fell DW Pica', 'IM Fell DW Pica SC', 'IM Fell Double Pica', 'IM Fell Double Pica SC', 'IM Fell English', 'IM Fell English SC', 'IM Fell French Canon', 'IM Fell French Canon SC', 'IM Fell Great Primer', 'IM Fell Great Primer SC', 'Ibarra Real Nova', 'Iceberg', 'Iceland', 'Imprima', 'Inconsolata', 'Inder', 'Indie Flower', 'Inika', 'Inknut Antiqua', 'Inria Serif', 'Irish Grover', 'Istok Web', 'Italiana', 'Italianno', 'Itim', 'Jacques Francois', 'Jacques Francois Shadow', 'Jaldi', 'Jim Nightshade', 'Jockey One', 'Jolly Lodger', 'Jomhuria', 'Jomolhari', 'Josefin Sans', 'Josefin Slab', 'Joti One', 'Jua', 'Judson', 'Julee', 'Julius Sans One', 'Junge', 'Jura', 'Just Another Hand', 'Just Me Again Down Here', 'K2D', 'Kadwa', 'Kalam', 'Kameron', 'Kanit', 'Kantumruy', 'Karla', 'Karma', 'Katibeh', 'Kaushan Script', 'Kavivanar', 'Kavoon', 'Kdam Thmor', 'Keania One', 'Kelly Slab', 'Kenia', 'Khand', 'Khmer', 'Khula', 'Kirang Haerang', 'Kite One', 'Knewave', 'KoHo', 'Kodchasan', 'Kosugi', 'Kosugi Maru', 'Kotta One', 'Koulen', 'Kranky', 'Kreon', 'Kristi', 'Krona One', 'Krub', 'Kulim Park', 'Kumar One', 'Kumar One Outline', 'Kurale', 'La Belle Aurore', 'Lacquer', 'Laila', 'Lakki Reddy', 'Lalezar', 'Lancelot', 'Lateef', 'Lato', 'League Script', 'Leckerli One', 'Ledger', 'Lekton', 'Lemon', 'Lemonada', 'Lexend Deca', 'Lexend Exa', 'Lexend Giga', 'Lexend Mega', 'Lexend Peta', 'Lexend Tera', 'Lexend Zetta', 'Libre Barcode 128', 'Libre Barcode 128 Text', 'Libre Barcode 39', 'Libre Barcode 39 Extended', 'Libre Barcode 39 Extended Text', 'Libre Barcode 39 Text', 'Libre Baskerville', 'Libre Caslon Display', 'Libre Caslon Text', 'Libre Franklin', 'Life Savers', 'Lilita One', 'Lily Script One', 'Limelight', 'Linden Hill', 'Literata', 'Liu Jian Mao Cao', 'Livvic', 'Lobster', 'Lobster Two', 'Londrina Outline', 'Londrina Shadow', 'Londrina Sketch', 'Londrina Solid', 'Long Cang', 'Lora', 'Love Ya Like A Sister', 'Loved by the King', 'Lovers Quarrel', 'Luckiest Guy', 'Lusitana', 'Lustria', 'M PLUS 1p', 'M PLUS Rounded 1c', 'Ma Shan Zheng', 'Macondo', 'Macondo Swash Caps', 'Mada', 'Magra', 'Maiden Orange', 'Maitree', 'Major Mono Display', 'Mako', 'Mali', 'Mallanna', 'Mandali', 'Manjari', 'Mansalva', 'Manuale', 'Marcellus', 'Marcellus SC', 'Marck Script', 'Margarine', 'Markazi Text', 'Marko One', 'Marmelad', 'Martel', 'Martel Sans', 'Marvel', 'Mate', 'Mate SC', 'Maven Pro', 'McLaren', 'Meddon', 'MedievalSharp', 'Medula One', 'Meera Inimai', 'Megrim', 'Meie Script', 'Merienda', 'Merienda One', 'Merriweather', 'Merriweather Sans', 'Metal', 'Metal Mania', 'Metamorphous', 'Metrophobic', 'Michroma', 'Milonga', 'Miltonian', 'Miltonian Tattoo', 'Mina', 'Miniver', 'Miriam Libre', 'Mirza', 'Miss Fajardose', 'Mitr', 'Modak', 'Modern Antiqua', 'Mogra', 'Molengo', 'Molle', 'Monda', 'Monofett', 'Monoton', 'Monsieur La Doulaise', 'Montaga', 'Montez', 'Montserrat', 'Montserrat Alternates', 'Montserrat Subrayada', 'Moul', 'Moulpali', 'Mountains of Christmas', 'Mouse Memoirs', 'Mr Bedfort', 'Mr Dafoe', 'Mr De Haviland', 'Mrs Saint Delafield', 'Mrs Sheppards', 'Mukta', 'Mukta Mahee', 'Mukta Malar', 'Mukta Vaani', 'Muli', 'Mystery Quest', 'NTR', 'Nanum Brush Script', 'Nanum Gothic', 'Nanum Gothic Coding', 'Nanum Myeongjo', 'Nanum Pen Script', 'Neucha', 'Neuton', 'New Rocker', 'News Cycle', 'Niconne', 'Niramit', 'Nixie One', 'Nobile', 'Nokora', 'Norican', 'Nosifer', 'Notable', 'Nothing You Could Do', 'Noticia Text', 'Noto Sans', 'Noto Sans HK', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC', 'Noto Sans TC', 'Noto Serif', 'Noto Serif JP', 'Noto Serif KR', 'Noto Serif SC', 'Noto Serif TC', 'Nova Cut', 'Nova Flat', 'Nova Mono', 'Nova Oval', 'Nova Round', 'Nova Script', 'Nova Slim', 'Nova Square', 'Numans', 'Nunito', 'Nunito Sans', 'Odibee Sans', 'Odor Mean Chey', 'Offside', 'Old Standard TT', 'Oldenburg', 'Oleo Script', 'Oleo Script Swash Caps', 'Open Sans', 'Open Sans Condensed', 'Oranienbaum', 'Orbitron', 'Oregano', 'Orienta', 'Original Surfer', 'Oswald', 'Over the Rainbow', 'Overlock', 'Overlock SC', 'Overpass', 'Overpass Mono', 'Ovo', 'Oxanium', 'Oxygen', 'Oxygen Mono', 'PT Mono', 'PT Sans', 'PT Sans Caption', 'PT Sans Narrow', 'PT Serif', 'PT Serif Caption', 'Pacifico', 'Padauk', 'Palanquin', 'Palanquin Dark', 'Pangolin', 'Paprika', 'Parisienne', 'Passero One', 'Passion One', 'Pathway Gothic One', 'Patrick Hand', 'Patrick Hand SC', 'Pattaya', 'Patua One', 'Pavanam', 'Paytone One', 'Peddana', 'Peralta', 'Permanent Marker', 'Petit Formal Script', 'Petrona', 'Philosopher', 'Piedra', 'Pinyon Script', 'Pirata One', 'Plaster', 'Play', 'Playball', 'Playfair Display', 'Playfair Display SC', 'Podkova', 'Poiret One', 'Poller One', 'Poly', 'Pompiere', 'Pontano Sans', 'Poor Story', 'Poppins', 'Port Lligat Sans', 'Port Lligat Slab', 'Pragati Narrow', 'Prata', 'Preahvihear', 'Press Start 2P', 'Pridi', 'Princess Sofia', 'Prociono', 'Prompt', 'Prosto One', 'Proza Libre', 'Public Sans', 'Puritan', 'Purple Purse', 'Quando', 'Quantico', 'Quattrocento', 'Quattrocento Sans', 'Questrial', 'Quicksand', 'Quintessential', 'Qwigley', 'Racing Sans One', 'Radley', 'Rajdhani', 'Rakkas', 'Raleway', 'Raleway Dots', 'Ramabhadra', 'Ramaraja', 'Rambla', 'Rammetto One', 'Ranchers', 'Rancho', 'Ranga', 'Rasa', 'Rationale', 'Ravi Prakash', 'Red Hat Display', 'Red Hat Text', 'Redressed', 'Reem Kufi', 'Reenie Beanie', 'Revalia', 'Rhodium Libre', 'Ribeye', 'Ribeye Marrow', 'Righteous', 'Risque', 'Roboto', 'Roboto Condensed', 'Roboto Mono', 'Roboto Slab', 'Rochester', 'Rock Salt', 'Rokkitt', 'Romanesco', 'Ropa Sans', 'Rosario', 'Rosarivo', 'Rouge Script', 'Rozha One', 'Rubik', 'Rubik Mono One', 'Ruda', 'Rufina', 'Ruge Boogie', 'Ruluko', 'Rum Raisin', 'Ruslan Display', 'Russo One', 'Ruthie', 'Rye', 'Sacramento', 'Sahitya', 'Sail', 'Saira', 'Saira Condensed', 'Saira Extra Condensed', 'Saira Semi Condensed', 'Saira Stencil One', 'Salsa', 'Sanchez', 'Sancreek', 'Sansita', 'Sarabun', 'Sarala', 'Sarina', 'Sarpanch', 'Satisfy', 'Sawarabi Gothic', 'Sawarabi Mincho', 'Scada', 'Scheherazade', 'Schoolbell', 'Scope One', 'Seaweed Script', 'Secular One', 'Sedgwick Ave', 'Sedgwick Ave Display', 'Sevillana', 'Seymour One', 'Shadows Into Light', 'Shadows Into Light Two', 'Shanti', 'Share', 'Share Tech', 'Share Tech Mono', 'Shojumaru', 'Short Stack', 'Shrikhand', 'Siemreap', 'Sigmar One', 'Signika', 'Signika Negative', 'Simonetta', 'Single Day', 'Sintony', 'Sirin Stencil', 'Six Caps', 'Skranji', 'Slabo 13px', 'Slabo 27px', 'Slackey', 'Smokum', 'Smythe', 'Sniglet', 'Snippet', 'Snowburst One', 'Sofadi One', 'Sofia', 'Solway', 'Song Myung', 'Sonsie One', 'Sorts Mill Goudy', 'Source Code Pro', 'Source Sans Pro', 'Source Serif Pro', 'Space Mono', 'Spartan', 'Special Elite', 'Spectral', 'Spectral SC', 'Spicy Rice', 'Spinnaker', 'Spirax', 'Squada One', 'Sree Krushnadevaraya', 'Sriracha', 'Srisakdi', 'Staatliches', 'Stalemate', 'Stalinist One', 'Stardos Stencil', 'Stint Ultra Condensed', 'Stint Ultra Expanded', 'Stoke', 'Strait', 'Stylish', 'Sue Ellen Francisco', 'Suez One', 'Sulphur Point', 'Sumana', 'Sunflower', 'Sunshiney', 'Supermercado One', 'Sura', 'Suranna', 'Suravaram', 'Suwannaphum', 'Swanky and Moo Moo', 'Syncopate', 'Tajawal', 'Tangerine', 'Taprom', 'Tauri', 'Taviraj', 'Teko', 'Telex', 'Tenali Ramakrishna', 'Tenor Sans', 'Text Me One', 'Thasadith', 'The Girl Next Door', 'Tienne', 'Tillana', 'Timmana', 'Tinos', 'Titan One', 'Titillium Web', 'Tomorrow', 'Trade Winds', 'Trirong', 'Trocchi', 'Trochut', 'Trykker', 'Tulpen One', 'Turret Road', 'Ubuntu', 'Ubuntu Condensed', 'Ubuntu Mono', 'Ultra', 'Uncial Antiqua', 'Underdog', 'Unica One', 'UnifrakturCook', 'UnifrakturMaguntia', 'Unkempt', 'Unlock', 'Unna', 'VT323', 'Vampiro One', 'Varela', 'Varela Round', 'Vast Shadow', 'Vesper Libre', 'Vibes', 'Vibur', 'Vidaloka', 'Viga', 'Voces', 'Volkhov', 'Vollkorn', 'Vollkorn SC', 'Voltaire', 'Waiting for the Sunrise', 'Wallpoet', 'Walter Turncoat', 'Warnes', 'Wellfleet', 'Wendy One', 'Wire One', 'Work Sans', 'Yanone Kaffeesatz', 'Yantramanav', 'Yatra One', 'Yellowtail', 'Yeon Sung', 'Yeseva One', 'Yesteryear', 'Yrsa', 'ZCOOL KuaiLe', 'ZCOOL QingKe HuangYou', 'ZCOOL XiaoWei', 'Zeyada', 'Zhi Mang Xing', 'Zilla Slab', 'Zilla Slab Highlight']
  let loadedFontsNames = {}
  function loadFont(fontName) {
    if (loadedFontsNames[fontName] != true) {
      WebFont.load({google: {families: [fontName]}});
      loadedFontsNames[fontName] = true
    }
    return fontName
  }

  let textToType = document.getElementById("text")

  let charactersLeft
  let firstCharacterTyped

  function randomSymbol(allowedSymbols) {
    return allowedSymbols.charAt(Math.floor(Math.random() * allowedSymbols.length))
  }

  let textGenerator = {
    allowedSymbols: 'qwertyuiopasdfghjklzxcvbnm ',
    allowedSymbolsWithoutSpaces: '',
    stringLength: 12,

    onAllowedSymbolsUpdated: function() {
      this.allowedSymbolsWithoutSpaces = this.allowedSymbols.replace(/ /g, '')
    },

    randomString: function() {
      let newString = ""
      for (let i = 0; i < this.stringLength; i++)
          newString += randomSymbol(this.allowedSymbols)
      return newString
    },

    randomStringWithoutSpacesAtTheEnds: function() {
      let newString = ""
      newString += randomSymbol(this.allowedSymbolsWithoutSpaces)
      if (this.stringLength == 1)
        return newString
      for (let i = 1; i < (this.stringLength - 1); i++)
          newString += randomSymbol(this.allowedSymbols)
      newString += randomSymbol(this.allowedSymbolsWithoutSpaces)
      return newString
    },

    functionForGeneratingText: null,

    newGeneratedText: function() {
      let newString = this.functionForGeneratingText()
      return newString
    }
  }
  textGenerator.onAllowedSymbolsUpdated()
  textGenerator.functionForGeneratingText = textGenerator.randomStringWithoutSpacesAtTheEnds

  let statisticsHandler = {
    measuring: false,
    startTime: undefined,
    currentLine: undefined,
    currentLineLength: undefined,
    timeSpentOnEachLine: [],
    meanTimeSpentOnEachSymbolOfEachLine: [],

    startMeasuring: function(line) {
      this.measuring = true
      this.startTime = performance.now()
      this.currentLine = line
    },
    endMeasuring: function() {
      this.measuring = false
      let elapsedTime = performance.now() - this.startTime
      this.timeSpentOnEachLine.push(elapsedTime)
      chartsHandler.charts['time spent on each line'].data.labels.push(this.currentLine)
      chartsHandler.charts['time spent on each line'].update(0)
      this.meanTimeSpentOnEachSymbolOfEachLine.push(elapsedTime / this.currentLine.length)
    }
  }

  let chartsHandler = {
    defaultCanvas: document.getElementById('defaultChartCanvas'),
    charts: {},
    
    addChart: function(canvas, name, data) {
      if (canvas == 'default')
        canvas = this.defaultCanvas
      this.charts[name] = new Chart(canvas, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: name,
            data: data
          }]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
        }
      })
    }
  }

  window.onbeforeprint = function() {
    for (var id in Chart.instances) {
        Chart.instances[id].resize();
    }
  }

  chartsHandler.addChart('default', 'time spent on each line', statisticsHandler.timeSpentOnEachLine)

  function generateNewText() {
    textToType.innerHTML = textGenerator.newGeneratedText()
    charactersLeft = textToType.innerHTML.length
    if (textToType.innerHTML.length == 1)
      statisticsHandler.startMeasuring(textToType.innerHTML)
  }

  var outerTextToTypeStyle = {
    x: 0,
    y: 0,
    fontSize: 0.05,
    dropShadow: 'true',
    shadowDistance: 5,
    shadowAngle: Math.PI / 3,
    shadowBlur: 2,
    shadowColor: '#000000'
  }
  function updateTextX(newX) {
    if (newX)
      outerTextToTypeStyle.x = newX
    textToType.style.left = outerTextToTypeStyle.x + 'vw'
  }
  function updateTextY(newY) {
    if (newY)
      outerTextToTypeStyle.y = newY
    textToType.style.top = outerTextToTypeStyle.y + 'vh'
  }
  function updateFontSize(newSize) {
    if (newSize)
      outerTextToTypeStyle.fontSize = newSize
    textToType.style.fontSize = outerTextToTypeStyle.fontSize + 'vh'
  }
  function updateShadowProperties() {
    if (outerTextToTypeStyle.dropShadow == 'false') {
      textToType.style.textShadow = 'none'
      return
    }
    let horizontalShadow = outerTextToTypeStyle.shadowDistance * Math.cos(outerTextToTypeStyle.shadowAngle)
    let verticalShadow = outerTextToTypeStyle.shadowDistance * Math.sin(outerTextToTypeStyle.shadowAngle)
    textToType.style.textShadow = horizontalShadow + 'px ' + verticalShadow + 'px ' + outerTextToTypeStyle.shadowBlur + 'px ' + 
                                  outerTextToTypeStyle.shadowColor
  }
  function onWindowResize() {
    updateTextX()
    updateTextY()
    updateFontSize()
  }
  window.addEventListener('resize', onWindowResize, false)

  var rootFolder = new dat.gui.GUI({name: 'Parameters'});
  rootFolder.remember(textGenerator)
  rootFolder.remember(textToType.style)
  rootFolder.remember(outerTextToTypeStyle)
  rootFolder.remember(document.body.style)

  var textGenerationFolder = rootFolder.addFolder('Text generation')
  let allowedSymbolsController = textGenerationFolder.add(textGenerator, 'allowedSymbols').name('Allowed symbols')
  allowedSymbolsController.onChange(() => {textGenerator.onAllowedSymbolsUpdated(); generateNewText()})
  let stringLengthController = textGenerationFolder.add(textGenerator, 'stringLength', 1, 50, 1)
  stringLengthController.name('String length')
  stringLengthController.onChange(generateNewText)

  var textStyleFolder = rootFolder.addFolder('Text style')
  var textToTypeFontFamilyController = textStyleFolder.add(textToType.style, 'fontFamily', allFontsNames).name('Font family')
  textToTypeFontFamilyController.setValue(loadFont(textToTypeFontFamilyController.getValue()))
  textToTypeFontFamilyController.onChange((newValue) => loadFont(newValue))
  var textPositionFolder = textStyleFolder.addFolder('Position')
  textPositionFolder.add(outerTextToTypeStyle, 'x', 0, 100, 1).onChange(updateTextX).name('Horizontal')
  textPositionFolder.add(outerTextToTypeStyle, 'y', 0, 100, 1).onChange(updateTextY).name('Vertical')
  textStyleFolder.add(outerTextToTypeStyle, 'fontSize', 0, 100, 0.1).onChange(updateFontSize).name('Font size')
  textStyleFolder.add(textToType.style, 'fontStyle', ['normal', 'italic']).name('Font style')
  textStyleFolder.add(textToType.style, 'fontWeight', ['normal', 'bold']).name('Font weight')
  textStyleFolder.addColor(textToType.style, 'color').name('Fill color')
  var shadowFolder = textStyleFolder.addFolder('Shadow style')
  outerTextToTypeStyle.dropShadow = 'true'
  shadowFolder.add(outerTextToTypeStyle, 'dropShadow', {Yes: 'true', No: 'false'}).onFinishChange(updateShadowProperties).name('Drop shadow')
  shadowFolder.add(outerTextToTypeStyle, 'shadowDistance', 0, 10, 1).onFinishChange(updateShadowProperties).name('Shadow distance')
  shadowFolder.add(outerTextToTypeStyle, 'shadowAngle', -Math.PI, Math.PI, 0.01).onFinishChange(updateShadowProperties).name('Shadow angle')
  shadowFolder.add(outerTextToTypeStyle, 'shadowBlur', 0, 10, 1).onFinishChange(updateShadowProperties).name('Shadow blur')
  shadowFolder.addColor(outerTextToTypeStyle, 'shadowColor').onFinishChange(updateShadowProperties).name('Shadow color')

  var backgroundStyleFolder = rootFolder.addFolder('Background style')
  backgroundStyleFolder.addColor(document.body.style, 'backgroundColor').name('Background color')

  generateNewText()

  keyEventHandler = event => {
    if (!statisticsHandler.measuring)
      statisticsHandler.startMeasuring(textToType.innerHTML)
    if (event.key == textToType.innerHTML[0]) {
      textToType.innerHTML = textToType.innerHTML.substring(1)
      charactersLeft -= 1
      if (charactersLeft == 0) {
        statisticsHandler.endMeasuring()
        generateNewText()
      }
    }
  }

  window.addEventListener('keydown', keyEventHandler, false)

  updateTextX()
  updateTextY()
  updateFontSize()
  updateShadowProperties()

  }