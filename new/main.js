const settingsButton = document.querySelector('.settings-button');
const settingsContent = document.querySelector('.settings-content');

settingsButton.onclick = function() {
    settingsContent.classList.toggle('opened');
};

const folderTitles = document.querySelectorAll('.settings-content .folder-title');

for (let folderTitle of folderTitles) {
    const currentTitleId = folderTitle.id;
    const currentFolder = document.querySelector('#_' + currentTitleId);
    folderTitle.onclick = function() {
        currentFolder.classList.toggle('opened');
    }
}



let textToType = document.getElementById('text');

function setValue(object, newValue) {
    if (object.value)
        object.value = newValue;
    else
        for (let i = 0; ; i += 1) {
            if (object.options[i].value === newValue) {
                object.selectedIndex = i;
                break;
            }
        }
    object.onchange();
}

const configHandler = {
    config: {},
    applyNewConfig: function(newConfigText) {
        const newConfig = JSON.parse(newConfigText);
        for (const [id, value] of Object.entries(newConfig)) {
            const settingController = document.querySelector('#' + id + '>.setting-controller');
            setValue(settingController, newConfig[id]);
        }
    },
    download: function() {
        download('config.json', JSON.stringify(configHandler.config));
    },
    upload: function() {
        upload(configHandler.applyNewConfig, 'json');
    }
}

const conditionalsHandler = {
    conditionals: {},
    addConditional: function(conditionalDiv) {
        if (!(conditionalDiv.getAttribute('whenId') in conditionalsHandler.conditionals))
            conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')] = {};
        if (!(conditionalDiv.getAttribute('whenValue') in conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')]))
            conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')][conditionalDiv.getAttribute('whenValue')] = [];
        conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')][conditionalDiv.getAttribute('whenValue')].push(conditionalDiv)
    },
    onChange: function(selectController) {
        if (selectController.id in conditionalsHandler.conditionals) {
            for (value in conditionalsHandler.conditionals[selectController.id]) {
                if (value === selectController.options[selectController.selectedIndex].value)
                    conditionalsHandler.conditionals[selectController.id][value].map((element) => element.classList.remove('conditional-hidden'));
                else
                    conditionalsHandler.conditionals[selectController.id][value].map((element) => element.classList.add('conditional-hidden'));
            }
        }
    }
};

const conditionalDivs = document.querySelectorAll('.conditional');
for (conditionalDiv of conditionalDivs)
    conditionalsHandler.addConditional(conditionalDiv);



const importConfigButton = document.getElementById('importConfigButton');
const exportConfigButton = document.getElementById('exportConfigButton');

importConfigButton.onclick = configHandler.upload;
exportConfigButton.onclick = configHandler.download;

function getValue(object) {
    if (object.type === 'checkbox')
        return object.checked;
    if (object.classList.contains('select'))
        return object.options[object.selectedIndex].value;
    return object.value;
}

function bind(id, dictionary, key, preprocessor, onFinishChange) {
    const settingController = document.querySelector('#' + id + '>.setting-controller');
    settingController.onchange = function() {
        let newValue = getValue(this);
        if (preprocessor !== undefined)
            dictionary[key] = preprocessor(newValue);
        else
            dictionary[key] = newValue;
        configHandler.config[id] = newValue;
        if (onFinishChange !== undefined)
            onFinishChange(newValue);
        if (settingController.classList.contains('select'))
            conditionalsHandler.onChange(settingController);
    }
    settingController.onchange();
    if (settingController.classList.contains('select'))
        conditionalsHandler.onChange(settingController);
}

bind('fontSize', textToType.style, 'fontSize', value => value + 'vh');
bind('horizontal', textToType.style, 'left', value => value + 'vh');
bind('vertical', textToType.style, 'top', value => value + 'vw');
bind('fontColor', textToType.style, 'color');
bind('backgroundColor', document.body.style, 'backgroundColor');
bind('italic', textToType.style, 'font-style', value => value ? 'italic' : 'normal');
bind('bold', textToType.style, 'font-weight', value => value ? 'bold' : 'normal');



let shadowStyle = {
    enabled: undefined,
    distance: undefined,
    angle: undefined,
    blur: undefined,
    color: undefined
};

function updateShadowStyle() {
    if (shadowStyle.enabled === false) {
        textToType.style.textShadow = 'none';
        return;
    }
    const horizontalShadow = shadowStyle.distance * Math.cos(shadowStyle.angle);
    const verticalShadow = shadowStyle.distance * Math.sin(shadowStyle.angle);
    textToType.style.textShadow = horizontalShadow + 'vh ' + verticalShadow + 'vh ' 
                                + shadowStyle.blur + 'vh ' + shadowStyle.color;
}

bind('dropShadow', shadowStyle, 'enabled', undefined, updateShadowStyle);
bind('shadowDistance', shadowStyle, 'distance', undefined, updateShadowStyle);
bind('shadowAngle', shadowStyle, 'angle', undefined, updateShadowStyle);
bind('shadowBlur', shadowStyle, 'blur', undefined, updateShadowStyle);
bind('shadowColor', shadowStyle, 'color', undefined, updateShadowStyle);



function addOptions(selectControllerId, optionsNames) {
    const controller = document.querySelector('#' + selectControllerId + '>.setting-controller');
    for (const optionName of optionsNames) {
        let newOption = document.createElement('option');
        newOption.value = optionName;
        newOption.text = optionName;
        controller.add(newOption);
    }
}



const allFontsNames = ['Abel', 'Abhaya Libre', 'Abril Fatface', 'Aclonica', 'Acme', 'Actor', 'Adamina', 'Advent Pro', 'Aguafina Script', 'Akronim', 'Aladin', 'Alata', 'Alatsi', 'Aldrich', 'Alef', 'Alegreya', 'Alegreya SC', 'Alegreya Sans', 'Alegreya Sans SC', 'Aleo', 'Alex Brush', 'Alfa Slab One', 'Alice', 'Alike', 'Alike Angular', 'Allan', 'Allerta', 'Allerta Stencil', 'Allura', 'Almarai', 'Almendra', 'Almendra Display', 'Almendra SC', 'Amarante', 'Amaranth', 'Amatic SC', 'Amethysta', 'Amiko', 'Amiri', 'Amita', 'Anaheim', 'Andada', 'Andika', 'Angkor', 'Annie Use Your Telescope', 'Anonymous Pro', 'Antic', 'Antic Didone', 'Antic Slab', 'Anton', 'Arapey', 'Arbutus', 'Arbutus Slab', 'Architects Daughter', 'Archivo', 'Archivo Black', 'Archivo Narrow', 'Aref Ruqaa', 'Arima Madurai', 'Arimo', 'Arizonia', 'Armata', 'Arsenal', 'Artifika', 'Arvo', 'Arya', 'Asap', 'Asap Condensed', 'Asar', 'Asset', 'Assistant', 'Astloch', 'Asul', 'Athiti', 'Atma', 'Atomic Age', 'Aubrey', 'Audiowide', 'Autour One', 'Average', 'Average Sans', 'Averia Gruesa Libre', 'Averia Libre', 'Averia Sans Libre', 'Averia Serif Libre', 'B612', 'B612 Mono', 'Bad Script', 'Bahiana', 'Bahianita', 'Bai Jamjuree', 'Baloo', 'Baloo Bhai', 'Baloo Bhaijaan', 'Baloo Bhaina', 'Baloo Chettan', 'Baloo Da', 'Baloo Paaji', 'Baloo Tamma', 'Baloo Tammudu', 'Baloo Thambi', 'Balthazar', 'Bangers', 'Barlow', 'Barlow Condensed', 'Barlow Semi Condensed', 'Barriecito', 'Barrio', 'Basic', 'Baskervville', 'Battambang', 'Baumans', 'Bayon', 'Be Vietnam', 'Bebas Neue', 'Belgrano', 'Bellefair', 'Belleza', 'BenchNine', 'Bentham', 'Berkshire Swash', 'Beth Ellen', 'Bevan', 'Big Shoulders Display', 'Big Shoulders Text', 'Bigelow Rules', 'Bigshot One', 'Bilbo', 'Bilbo Swash Caps', 'BioRhyme', 'BioRhyme Expanded', 'Biryani', 'Bitter', 'Black And White Picture', 'Black Han Sans', 'Black Ops One', 'Blinker', 'Bokor', 'Bonbon', 'Boogaloo', 'Bowlby One', 'Bowlby One SC', 'Brawler', 'Bree Serif', 'Bubblegum Sans', 'Bubbler One', 'Buda', 'Buenard', 'Bungee', 'Bungee Hairline', 'Bungee Inline', 'Bungee Outline', 'Bungee Shade', 'Butcherman', 'Butterfly Kids', 'Cabin', 'Cabin Condensed', 'Cabin Sketch', 'Caesar Dressing', 'Cagliostro', 'Cairo', 'Caladea', 'Calistoga', 'Calligraffitti', 'Cambay', 'Cambo', 'Candal', 'Cantarell', 'Cantata One', 'Cantora One', 'Capriola', 'Cardo', 'Carme', 'Carrois Gothic', 'Carrois Gothic SC', 'Carter One', 'Catamaran', 'Caudex', 'Caveat', 'Caveat Brush', 'Cedarville Cursive', 'Ceviche One', 'Chakra Petch', 'Changa', 'Changa One', 'Chango', 'Charm', 'Charmonman', 'Chathura', 'Chau Philomene One', 'Chela One', 'Chelsea Market', 'Chenla', 'Cherry Cream Soda', 'Cherry Swash', 'Chewy', 'Chicle', 'Chilanka', 'Chivo', 'Chonburi', 'Cinzel', 'Cinzel Decorative', 'Clicker Script', 'Coda', 'Coda Caption', 'Codystar', 'Coiny', 'Combo', 'Comfortaa', 'Coming Soon', 'Concert One', 'Condiment', 'Content', 'Contrail One', 'Convergence', 'Cookie', 'Copse', 'Corben', 'Cormorant', 'Cormorant Garamond', 'Cormorant Infant', 'Cormorant SC', 'Cormorant Unicase', 'Cormorant Upright', 'Courgette', 'Courier Prime', 'Cousine', 'Coustard', 'Covered By Your Grace', 'Crafty Girls', 'Creepster', 'Crete Round', 'Crimson Pro', 'Crimson Text', 'Croissant One', 'Crushed', 'Cuprum', 'Cute Font', 'Cutive', 'Cutive Mono', 'DM Sans', 'DM Serif Display', 'DM Serif Text', 'Damion', 'Dancing Script', 'Dangrek', 'Darker Grotesque', 'David Libre', 'Dawning of a New Day', 'Days One', 'Dekko', 'Delius', 'Delius Swash Caps', 'Delius Unicase', 'Della Respira', 'Denk One', 'Devonshire', 'Dhurjati', 'Didact Gothic', 'Diplomata', 'Diplomata SC', 'Do Hyeon', 'Dokdo', 'Domine', 'Donegal One', 'Doppio One', 'Dorsa', 'Dosis', 'Dr Sugiyama', 'Duru Sans', 'Dynalight', 'EB Garamond', 'Eagle Lake', 'East Sea Dokdo', 'Eater', 'Economica', 'Eczar', 'El Messiri', 'Electrolize', 'Elsie', 'Elsie Swash Caps', 'Emblema One', 'Emilys Candy', 'Encode Sans', 'Encode Sans Condensed', 'Encode Sans Expanded', 'Encode Sans Semi Condensed', 'Encode Sans Semi Expanded', 'Engagement', 'Englebert', 'Enriqueta', 'Erica One', 'Esteban', 'Euphoria Script', 'Ewert', 'Exo', 'Exo 2', 'Expletus Sans', 'Fahkwang', 'Fanwood Text', 'Farro', 'Farsan', 'Fascinate', 'Fascinate Inline', 'Faster One', 'Fasthand', 'Fauna One', 'Faustina', 'Federant', 'Federo', 'Felipa', 'Fenix', 'Finger Paint', 'Fira Code', 'Fira Mono', 'Fira Sans', 'Fira Sans Condensed', 'Fira Sans Extra Condensed', 'Fjalla One', 'Fjord One', 'Flamenco', 'Flavors', 'Fondamento', 'Fontdiner Swanky', 'Forum', 'Francois One', 'Frank Ruhl Libre', 'Freckle Face', 'Fredericka the Great', 'Fredoka One', 'Freehand', 'Fresca', 'Frijole', 'Fruktur', 'Fugaz One', 'GFS Didot', 'GFS Neohellenic', 'Gabriela', 'Gaegu', 'Gafata', 'Galada', 'Galdeano', 'Galindo', 'Gamja Flower', 'Gayathri', 'Gelasio', 'Gentium Basic', 'Gentium Book Basic', 'Geo', 'Geostar', 'Geostar Fill', 'Germania One', 'Gidugu', 'Gilda Display', 'Girassol', 'Give You Glory', 'Glass Antiqua', 'Glegoo', 'Gloria Hallelujah', 'Goblin One', 'Gochi Hand', 'Gorditas', 'Gothic A1', 'Goudy Bookletter 1911', 'Graduate', 'Grand Hotel', 'Gravitas One', 'Great Vibes', 'Grenze', 'Griffy', 'Gruppo', 'Gudea', 'Gugi', 'Gupter', 'Gurajada', 'Habibi', 'Halant', 'Hammersmith One', 'Hanalei', 'Hanalei Fill', 'Handlee', 'Hanuman', 'Happy Monkey', 'Harmattan', 'Headland One', 'Heebo', 'Henny Penny', 'Hepta Slab', 'Herr Von Muellerhoff', 'Hi Melody', 'Hind', 'Hind Guntur', 'Hind Madurai', 'Hind Siliguri', 'Hind Vadodara', 'Holtwood One SC', 'Homemade Apple', 'Homenaje', 'IBM Plex Mono', 'IBM Plex Sans', 'IBM Plex Sans Condensed', 'IBM Plex Serif', 'IM Fell DW Pica', 'IM Fell DW Pica SC', 'IM Fell Double Pica', 'IM Fell Double Pica SC', 'IM Fell English', 'IM Fell English SC', 'IM Fell French Canon', 'IM Fell French Canon SC', 'IM Fell Great Primer', 'IM Fell Great Primer SC', 'Ibarra Real Nova', 'Iceberg', 'Iceland', 'Imprima', 'Inconsolata', 'Inder', 'Indie Flower', 'Inika', 'Inknut Antiqua', 'Inria Serif', 'Irish Grover', 'Istok Web', 'Italiana', 'Italianno', 'Itim', 'Jacques Francois', 'Jacques Francois Shadow', 'Jaldi', 'Jim Nightshade', 'Jockey One', 'Jolly Lodger', 'Jomhuria', 'Jomolhari', 'Josefin Sans', 'Josefin Slab', 'Joti One', 'Jua', 'Judson', 'Julee', 'Julius Sans One', 'Junge', 'Jura', 'Just Another Hand', 'Just Me Again Down Here', 'K2D', 'Kadwa', 'Kalam', 'Kameron', 'Kanit', 'Kantumruy', 'Karla', 'Karma', 'Katibeh', 'Kaushan Script', 'Kavivanar', 'Kavoon', 'Kdam Thmor', 'Keania One', 'Kelly Slab', 'Kenia', 'Khand', 'Khmer', 'Khula', 'Kirang Haerang', 'Kite One', 'Knewave', 'KoHo', 'Kodchasan', 'Kosugi', 'Kosugi Maru', 'Kotta One', 'Koulen', 'Kranky', 'Kreon', 'Kristi', 'Krona One', 'Krub', 'Kulim Park', 'Kumar One', 'Kumar One Outline', 'Kurale', 'La Belle Aurore', 'Lacquer', 'Laila', 'Lakki Reddy', 'Lalezar', 'Lancelot', 'Lateef', 'Lato', 'League Script', 'Leckerli One', 'Ledger', 'Lekton', 'Lemon', 'Lemonada', 'Lexend Deca', 'Lexend Exa', 'Lexend Giga', 'Lexend Mega', 'Lexend Peta', 'Lexend Tera', 'Lexend Zetta', 'Libre Barcode 128', 'Libre Barcode 128 Text', 'Libre Barcode 39', 'Libre Barcode 39 Extended', 'Libre Barcode 39 Extended Text', 'Libre Barcode 39 Text', 'Libre Baskerville', 'Libre Caslon Display', 'Libre Caslon Text', 'Libre Franklin', 'Life Savers', 'Lilita One', 'Lily Script One', 'Limelight', 'Linden Hill', 'Literata', 'Liu Jian Mao Cao', 'Livvic', 'Lobster', 'Lobster Two', 'Londrina Outline', 'Londrina Shadow', 'Londrina Sketch', 'Londrina Solid', 'Long Cang', 'Lora', 'Love Ya Like A Sister', 'Loved by the King', 'Lovers Quarrel', 'Luckiest Guy', 'Lusitana', 'Lustria', 'M PLUS 1p', 'M PLUS Rounded 1c', 'Ma Shan Zheng', 'Macondo', 'Macondo Swash Caps', 'Mada', 'Magra', 'Maiden Orange', 'Maitree', 'Major Mono Display', 'Mako', 'Mali', 'Mallanna', 'Mandali', 'Manjari', 'Mansalva', 'Manuale', 'Marcellus', 'Marcellus SC', 'Marck Script', 'Margarine', 'Markazi Text', 'Marko One', 'Marmelad', 'Martel', 'Martel Sans', 'Marvel', 'Mate', 'Mate SC', 'Maven Pro', 'McLaren', 'Meddon', 'MedievalSharp', 'Medula One', 'Meera Inimai', 'Megrim', 'Meie Script', 'Merienda', 'Merienda One', 'Merriweather', 'Merriweather Sans', 'Metal', 'Metal Mania', 'Metamorphous', 'Metrophobic', 'Michroma', 'Milonga', 'Miltonian', 'Miltonian Tattoo', 'Mina', 'Miniver', 'Miriam Libre', 'Mirza', 'Miss Fajardose', 'Mitr', 'Modak', 'Modern Antiqua', 'Mogra', 'Molengo', 'Molle', 'Monda', 'Monofett', 'Monoton', 'Monsieur La Doulaise', 'Montaga', 'Montez', 'Montserrat', 'Montserrat Alternates', 'Montserrat Subrayada', 'Moul', 'Moulpali', 'Mountains of Christmas', 'Mouse Memoirs', 'Mr Bedfort', 'Mr Dafoe', 'Mr De Haviland', 'Mrs Saint Delafield', 'Mrs Sheppards', 'Mukta', 'Mukta Mahee', 'Mukta Malar', 'Mukta Vaani', 'Muli', 'Mystery Quest', 'NTR', 'Nanum Brush Script', 'Nanum Gothic', 'Nanum Gothic Coding', 'Nanum Myeongjo', 'Nanum Pen Script', 'Neucha', 'Neuton', 'New Rocker', 'News Cycle', 'Niconne', 'Niramit', 'Nixie One', 'Nobile', 'Nokora', 'Norican', 'Nosifer', 'Notable', 'Nothing You Could Do', 'Noticia Text', 'Noto Sans', 'Noto Sans HK', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC', 'Noto Sans TC', 'Noto Serif', 'Noto Serif JP', 'Noto Serif KR', 'Noto Serif SC', 'Noto Serif TC', 'Nova Cut', 'Nova Flat', 'Nova Mono', 'Nova Oval', 'Nova Round', 'Nova Script', 'Nova Slim', 'Nova Square', 'Numans', 'Nunito', 'Nunito Sans', 'Odibee Sans', 'Odor Mean Chey', 'Offside', 'Old Standard TT', 'Oldenburg', 'Oleo Script', 'Oleo Script Swash Caps', 'Open Sans', 'Open Sans Condensed', 'Oranienbaum', 'Orbitron', 'Oregano', 'Orienta', 'Original Surfer', 'Oswald', 'Over the Rainbow', 'Overlock', 'Overlock SC', 'Overpass', 'Overpass Mono', 'Ovo', 'Oxanium', 'Oxygen', 'Oxygen Mono', 'PT Mono', 'PT Sans', 'PT Sans Caption', 'PT Sans Narrow', 'PT Serif', 'PT Serif Caption', 'Pacifico', 'Padauk', 'Palanquin', 'Palanquin Dark', 'Pangolin', 'Paprika', 'Parisienne', 'Passero One', 'Passion One', 'Pathway Gothic One', 'Patrick Hand', 'Patrick Hand SC', 'Pattaya', 'Patua One', 'Pavanam', 'Paytone One', 'Peddana', 'Peralta', 'Permanent Marker', 'Petit Formal Script', 'Petrona', 'Philosopher', 'Piedra', 'Pinyon Script', 'Pirata One', 'Plaster', 'Play', 'Playball', 'Playfair Display', 'Playfair Display SC', 'Podkova', 'Poiret One', 'Poller One', 'Poly', 'Pompiere', 'Pontano Sans', 'Poor Story', 'Poppins', 'Port Lligat Sans', 'Port Lligat Slab', 'Pragati Narrow', 'Prata', 'Preahvihear', 'Press Start 2P', 'Pridi', 'Princess Sofia', 'Prociono', 'Prompt', 'Prosto One', 'Proza Libre', 'Public Sans', 'Puritan', 'Purple Purse', 'Quando', 'Quantico', 'Quattrocento', 'Quattrocento Sans', 'Questrial', 'Quicksand', 'Quintessential', 'Qwigley', 'Racing Sans One', 'Radley', 'Rajdhani', 'Rakkas', 'Raleway', 'Raleway Dots', 'Ramabhadra', 'Ramaraja', 'Rambla', 'Rammetto One', 'Ranchers', 'Rancho', 'Ranga', 'Rasa', 'Rationale', 'Ravi Prakash', 'Red Hat Display', 'Red Hat Text', 'Redressed', 'Reem Kufi', 'Reenie Beanie', 'Revalia', 'Rhodium Libre', 'Ribeye', 'Ribeye Marrow', 'Righteous', 'Risque', 'Roboto', 'Roboto Condensed', 'Roboto Mono', 'Roboto Slab', 'Rochester', 'Rock Salt', 'Rokkitt', 'Romanesco', 'Ropa Sans', 'Rosario', 'Rosarivo', 'Rouge Script', 'Rozha One', 'Rubik', 'Rubik Mono One', 'Ruda', 'Rufina', 'Ruge Boogie', 'Ruluko', 'Rum Raisin', 'Ruslan Display', 'Russo One', 'Ruthie', 'Rye', 'Sacramento', 'Sahitya', 'Sail', 'Saira', 'Saira Condensed', 'Saira Extra Condensed', 'Saira Semi Condensed', 'Saira Stencil One', 'Salsa', 'Sanchez', 'Sancreek', 'Sansita', 'Sarabun', 'Sarala', 'Sarina', 'Sarpanch', 'Satisfy', 'Sawarabi Gothic', 'Sawarabi Mincho', 'Scada', 'Scheherazade', 'Schoolbell', 'Scope One', 'Seaweed Script', 'Secular One', 'Sedgwick Ave', 'Sedgwick Ave Display', 'Sevillana', 'Seymour One', 'Shadows Into Light', 'Shadows Into Light Two', 'Shanti', 'Share', 'Share Tech', 'Share Tech Mono', 'Shojumaru', 'Short Stack', 'Shrikhand', 'Siemreap', 'Sigmar One', 'Signika', 'Signika Negative', 'Simonetta', 'Single Day', 'Sintony', 'Sirin Stencil', 'Six Caps', 'Skranji', 'Slabo 13px', 'Slabo 27px', 'Slackey', 'Smokum', 'Smythe', 'Sniglet', 'Snippet', 'Snowburst One', 'Sofadi One', 'Sofia', 'Solway', 'Song Myung', 'Sonsie One', 'Sorts Mill Goudy', 'Source Code Pro', 'Source Sans Pro', 'Source Serif Pro', 'Space Mono', 'Spartan', 'Special Elite', 'Spectral', 'Spectral SC', 'Spicy Rice', 'Spinnaker', 'Spirax', 'Squada One', 'Sree Krushnadevaraya', 'Sriracha', 'Srisakdi', 'Staatliches', 'Stalemate', 'Stalinist One', 'Stardos Stencil', 'Stint Ultra Condensed', 'Stint Ultra Expanded', 'Stoke', 'Strait', 'Stylish', 'Sue Ellen Francisco', 'Suez One', 'Sulphur Point', 'Sumana', 'Sunflower', 'Sunshiney', 'Supermercado One', 'Sura', 'Suranna', 'Suravaram', 'Suwannaphum', 'Swanky and Moo Moo', 'Syncopate', 'Tajawal', 'Tangerine', 'Taprom', 'Tauri', 'Taviraj', 'Teko', 'Telex', 'Tenali Ramakrishna', 'Tenor Sans', 'Text Me One', 'Thasadith', 'The Girl Next Door', 'Tienne', 'Tillana', 'Timmana', 'Tinos', 'Titan One', 'Titillium Web', 'Tomorrow', 'Trade Winds', 'Trirong', 'Trocchi', 'Trochut', 'Trykker', 'Tulpen One', 'Turret Road', 'Ubuntu', 'Ubuntu Condensed', 'Ubuntu Mono', 'Ultra', 'Uncial Antiqua', 'Underdog', 'Unica One', 'UnifrakturCook', 'UnifrakturMaguntia', 'Unkempt', 'Unlock', 'Unna', 'VT323', 'Vampiro One', 'Varela', 'Varela Round', 'Vast Shadow', 'Vesper Libre', 'Vibes', 'Vibur', 'Vidaloka', 'Viga', 'Voces', 'Volkhov', 'Vollkorn', 'Vollkorn SC', 'Voltaire', 'Waiting for the Sunrise', 'Wallpoet', 'Walter Turncoat', 'Warnes', 'Wellfleet', 'Wendy One', 'Wire One', 'Work Sans', 'Yanone Kaffeesatz', 'Yantramanav', 'Yatra One', 'Yellowtail', 'Yeon Sung', 'Yeseva One', 'Yesteryear', 'Yrsa', 'ZCOOL KuaiLe', 'ZCOOL QingKe HuangYou', 'ZCOOL XiaoWei', 'Zeyada', 'Zhi Mang Xing', 'Zilla Slab', 'Zilla Slab Highlight']
let loadedFontsNames = {}
function loadFont(fontName) {
    if (loadedFontsNames[fontName] != true) {
        WebFont.load({google: {families: [fontName]}});
        loadedFontsNames[fontName] = true
    }
    return fontName
}

addOptions('font', allFontsNames);
bind('font', textToType.style, 'fontFamily', loadFont);



function sync(id, dict, key) {
    const object = document.querySelector('#' + id + '>.setting-controller');
    setValue(object, dict[key]);
}



function randomSymbol(symbols) {
    return symbols.charAt(Math.floor(Math.random() * symbols.length))
}

const textGenerator = {
    methods: {
        'Random characters': {
            options: {
                symbols: undefined,
                numberOfSymbols: undefined
            },
            functions: {
                randomSymbol: function(symbols) {
                    return symbols.charAt(Math.floor(Math.random() * symbols.length))
                }
            },
            generate: function() {
                let newString = '';
                let allowedSymbolsWithoutSpaces = this.options.symbols.replace(/ /g, '');
                newString += randomSymbol(allowedSymbolsWithoutSpaces);
                if (this.options.numberOfSymbols == 1)
                    return newString;
                for (let i = 1; i < (this.options.numberOfSymbols - 1); i++)
                    newString += this.functions.randomSymbol(this.options.symbols);
                newString += randomSymbol(allowedSymbolsWithoutSpaces);
                return newString;
            }
        },
        'Random fake words': {
            options: {
                numberOfWords: undefined
            },
            generate: function() {
                newString = fake.word()
                for (let i = 1; i < this.options.numberOfWords; i++)
                    newString += ' ' + fake.word()
                return newString.toLowerCase()
            }
        },
        'Markov chain': {
            options: {
                numberOfWordsInChain: undefined
            },
            variables: {
                generator: undefined,
                corpus: undefined
            },
            buttons: {
                uploadCorpus: function() {
                    upload((text) => {
                        _this = textGenerator.methods['Markov chain'];
                        _this.variables.corpus = text;
                        _this.functions.makeNewGenerator();
                        textGenerator.generate();
                    }, 'txt');
                }
            },
            functions: {
                replaceLineBreaksWithSpaces: function(string) {
                    return string.replace(/[\r\n]+/g, ' ');
                },
                makeNewGenerator: function() {
                    _this = textGenerator.methods['Markov chain'];
                    _this.variables.generator = new markov(_this.functions.replaceLineBreaksWithSpaces(_this.variables.corpus), 'string', /[.,?"();\-!':—^\w]+ /g);
                }
            },
            generate: function() {
                if (this.variables.generator === undefined)
                    return 'Upload corpus (larger is better) to generate more text';
                return this.variables.generator.gen(this.options.numberOfWordsInChain.replace(/^\s+|\s+$/g, ''));
            }
        },
        'Given text file': {
            options: {
                numberOfSentences: undefined,
                currentSentenceNumber: undefined
            },
            variables: {
                text: undefined
            },
            buttons: {
                uploadTextFile: function() {
                    upload((text) => {
                        _this = textGenerator.methods['Given text file'];
                        _this.variables.text = text.match( /[^\.!\?\n\r]+[\.!\?\n\r]+/g ) || [text];
                        _this.options.currentSentenceNumber = 1;
                        sync('currentSentenceNumber', _this.options, 'currentSentenceNumber');
                        const currentSentenceNumberObject = document.querySelector('#currentSentenceNumber>.setting-controller');
                        currentSentenceNumberObject.max = _this.variables.text.length;
                        textGenerator.generate();
                    }, 'txt');
                }
            },
            functions: {
                replaceLineBreaksWithSpaces: function(string) {
                    return string.replace(/[\r\n]+/g, ' ');
                },
                incCurrentSentenceNumber: function() {
                    _this = textGenerator.methods['Given text file'];
                    const newSentenceNumber = Number.parseInt(_this.options.currentSentenceNumber) + 1;
                    if (newSentenceNumber > _this.variables.text.length)
                        newSentenceNumber = 1;
                    _this.options.currentSentenceNumber = newSentenceNumber;
                    sync('currentSentenceNumber', _this.options, 'currentSentenceNumber');
                }
            },
            generate: function(mode) {
                console.log('generate');
                if (this.variables.text === undefined)
                    return 'Upload file to type sentences from';

                if (mode === 'next') {
                    this.functions.incCurrentSentenceNumber();
                }
                let firstSentenceIndex = this.options.currentSentenceNumber - 1;
                if (firstSentenceIndex > this.variables.text.length) {
                    this.options.currentSentenceNumber = 1;
                    sync('currentSentenceNumber', this.options, 'currentSentenceNumber');
                    firstSentenceIndex = 0;
                }
                const numberOfSentences = Number.parseInt(this.options.numberOfSentences, 10);
                const lastSentenceIndex = Math.min(firstSentenceIndex + numberOfSentences, this.variables.text.length);
                console.log(firstSentenceIndex, lastSentenceIndex);
                
                return this.functions.replaceLineBreaksWithSpaces(this.variables.text.slice(firstSentenceIndex, lastSentenceIndex).join('')).replace(/^\s+|\s+$/g, '');;
            }
        }
    },
    currentMethod: undefined,
    bindOptions: function() {
        for (const method of Object.values(textGenerator.methods))
            for (const optionName of Object.keys(method.options))
                bind(optionName, method.options, optionName, undefined, textGenerator.generate);
    },
    bindButtons: function() {
        for (const method of Object.values(textGenerator.methods))
            if ('buttons' in method)
                for (const buttonName of Object.keys(method.buttons)) {
                    const button = document.getElementById(buttonName);
                    button.onclick = method.buttons[buttonName];
                }
    },
    generate: function(mode) {
        if (textGenerator.initialized === false)
            return;
        textToType.innerHTML = textGenerator.methods[textGenerator.currentMethod].generate(mode);
    },
    initialized: false,
    init: function() {
        addOptions('method', Object.keys(textGenerator.methods));
        bind('method', textGenerator, 'currentMethod', undefined, textGenerator.generate);
        textGenerator.bindOptions();
        textGenerator.bindButtons();
        textGenerator.initialized = true;
        textGenerator.generate();
    }
}

textGenerator.init();



function keyEventHandler(event) {
    if (event.key === textToType.innerHTML[0]) {
        if (textToType.innerHTML.length === 1) {
            textGenerator.generate('next');
        }
        else
            textToType.innerHTML = textToType.innerHTML.substring(1);
    }
}

window.addEventListener('keydown', keyEventHandler, false);