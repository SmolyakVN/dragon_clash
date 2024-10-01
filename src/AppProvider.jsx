import {React, createContext, useContext, useState, useEffect} from 'react';
import classesSideframe from './components/Frames/Sideframe.module.css';

const AppContext = createContext();

const useAppContext = () => useContext(AppContext);

const cardsPower = [1, 2, 2, 3, 3, 4, 4, 5];

const dragonsList = [
  [
    // {'name': 'Шрикос', 'alias': 'Молодой добряк', 'description': 'Молодой дракон, принадлежащий сыну Эйгона 11, принцу Джейхейрису.'},
    // {'name': 'Тессарион', 'description': 'Также известна как Синяя Королева, принадлежит Дейрону Таргариену. Имеет тёмные, словно кобальт, крылья, а когти, гребень и брюхо сияют, как чеканная медь. Пламя кобальтовое, т.е. темно-синее. Считалается молодым драконом, ее размеры втрое меньше, чем у Вермитора.'},
    // {'name': 'Моргул', 'description': 'Ровестник Шрикос, связан с дочерью Эйгона 11, принцессой Джейхейрой.'},
    // {'name': 'Пламенная Мечта', 'description': 'Самка дракона, ранее связанная с Рейной Таргариен, сестрой Джейхейриса 1, сейчас её наездницей является Хелейна Таргариен.'},
    // {'name': 'Солнечный Огонь', 'description': 'Дракон Короля Эйгона 11. Имеет золотую чешую и нежно-розовые перепонки крыльев. Изрыгает ярко-золотое пламя, освещающее всё вокруг. Также известен как Золотой Дракон, считается самым великолепным из драконов, когда-либо паривших в небесах Вестероса.'},
    // {'name': 'Среброкрылая', 'description': 'Некогда принадлежала Алисанне Таргариен, сейчас её наездником является Ульф Белый. Названа так благодаря серебристому цвету чешуи. Изрыгает голубое пламя.'},
    // {'name': 'Вермитор', 'description': 'Также известный как Бронзовый Гнев — дракон Джейхейриса 1 Таргариена, один из самых крупных драконов династии Таргариенов. Бронзовый дракон с широкими бурыми крыльями, глаза, словно омуты из расплавленной бронзы. Цвет пламени - золотой. Принадлежит Хью Молоту.'},
    // {'name': 'Вхагар', 'description': 'Дракон-самка, больше всего известная как дракон Висеньи Таргариен, старшей сестры-жены Эйгона Завоевателя. Является самым крупным из живущих ныне драконов, лишь немного уступая в размерах знаменитому Балериону. Имеет столь же дурной нрав как и её нынешний наездник - принц Эймонд Таргариен.'}
    {'name': 'Шрикос', 'originalName': 'Shrykos', 'alias': 'Молодой добряк', 'description': 'Является верным спутником принца Джейхейриса, сына Эйгона 11. Он ещё не достиг полного расцвета своей силы, но уже показывает признаки невероятной скорости и силы. Его крылья расправляются с грацией, характерной для его юного возраста, но в его полёте ощущается предвкушение будущей мощи. В отличие от своего ровесника Моргула, имеет мягкий и спокойных характер, очень предан своему молодому наезднику.'},
    {'name': 'Тессарион', 'originalName': 'Tessarion', 'alias': 'Синяя Королева',  'description': 'Тессарион - одна из самых впечатляющих драконов своего времени. Покрыта фиолетово-синей чешуёй, распахнутые в полёте тёмные крылья напоминают ночное небо, а когти, гребень и брюхо отливают медным блеском, как чеканная монета. Её пламя имеет редкий для драконов тёмный, кобальтовый цвет. Будучи втрое меньше Вермитора, Тессарион сохраняет удивительную проворность в воздухе, летая с грацией и силой, достойными её титула. Она принадлежит младшему из детей Визериса 1 и Алисенты Хайтауэр, принцу Дейрону Таргариену.'},
    {'name': 'Моргул', 'originalName': 'Morghul', 'alias': 'Тень Ужаса', 'description': 'Молодой дракон, но его пламя и сила уже внушают почтение. Привязанный к принцессе Джейхейре, он был рожден в одно время со Шрикосом, драконом её брата, принца Джейхейриса. Несмотря на свой возраст, Моргул демонстрирует необычайную решительность в сражениях, быстро вырастая в грозного воина, который не знает страха перед врагом. Хотя его сила ещё не до конца раскрыта, он обладает потенциалом стать одним из величайших драконов.'},
    {'name': 'Пламенная Мечта', 'originalName': 'Dreamfyre', 'alias': 'Огонь из прошлого', 'description': 'Когда-то она принадлежала Рейне Таргариен, сестре Джейхейриса 1, но теперь её хозяйкой стала Хелейна Таргариен. Её чешуя сверкает как отполированная сталь, и в полёте она словно оставляет за собой мерцание огня. Она обладает непоколебимой верностью своей наезднице. Хотя время беспощадно меняет её наездниц, огонь её души по-прежнему не угасает, напоминая о прошлом, которое остаётся в каждом её взмахе крыльев.'},
    {'name': 'Солнечный Огонь', 'originalName': 'Sunfyre', 'alias': 'Золотой Дракон', 'description': 'Великолепный дракон Короля Эйгона 11, сверкает в небе, словно ожившая легенда. Его чешуя, переливающаяся чистым золотом, словно сокровища древних королей, ослепляет своей яркостью, а нежно-розовые перепонки крыльев добавляют ему изысканную грацию. Величественен и могущественен, он извергает золотое пламя, столь же яркое, как и его облик, освещая все вокруг своим светом. Этот дракон, названный Золотым за свою неоспоримую красоту, считается самым прекрасным из всех, когда-либо паривших в небесах Вестероса, словно сама сущность солнца воплотилась в нём.'},
    {'name': 'Среброкрылая', 'originalName': 'Silverwing', 'alias': 'Серебряный Самородок', 'description': 'Среброкрылая, некогда верный спутник Алисанны Таргариен, а ныне дракон Ульфа Белого, олицетворяет собой изящество и благородство. Её чешуя сверкает благородным серебром, словно отливающая лунным светом на закате. Этот дракон выделяется среди своих сородичей не только великолепной внешностью, но и величавым спокойствием. Её голубое пламя столь же яркое и холодное, как утренний лёд, и, хотя она уже видала немало битв, Среброкрылая сохраняет грацию, свойственную королевским драконам. Каждое её движение — словно танец ветра, а её мощь и сила ощущаются даже на огромном расстоянии.'},
    {'name': 'Вермитор', 'originalName': 'Vermithor', 'alias': 'Бронзовый Гнев', 'description': 'Один из самых крупных и устрашающих драконов Вестероса. Этот бронзовый гигант с широкими бурыми крыльями некогда принадлежал королю Джейхейрису 1 Таргариену, а теперь служит бывшему кузнецу Хью Молоту, заслужившему это право во время Красного Сева. Его глаза, словно омуты расплавленной бронзы, сияют яростью, а золотое пламя сжигает всё на своём пути. Несмотря на свой возраст, Вермитор не утратил своей смертоносной силы, и его присутствие на поле боя вселяет страх и ужас как во врагов, так и в союзников.'},
    {'name': 'Вхагар', 'originalName': 'Vhagar', 'alias': 'Величайший из живущих', 'description': 'Последний живой свидетель Завоевания Вестероса, является легендой среди драконов. Некогда принадлежавшая самой Висенье Таргариен, она теперь верой и правдой служит принцу Эймонду. Величественная и грозная, её размеры поражают воображение – Вхагар уступает в величии лишь Балериону, Чёрному Ужасу. Её буро-зелёная чешуя напоминает старый металл, закалённый в бесчисленных битвах, а огромные крылья создают тень, в которой может скрыться целое войско. Её пламя — палящее и губительное, оно сжигает врагов в мгновение ока. Как и её наездник, Вхагар обладает жестоким, беспощадным характером. Несмотря на свой внушительный возраст, представляет самую большую угрозу для своих недругов.'}
  ],
  [
    // {'name': 'Арракс', 'description': 'Жемчужно-белый дракон с золотыми глазами и золотой грудью, красным гребнем и крыльями, пламя имеет ярко-жёлтый цвет. Арракс впятеро меньше Вхагар. Его наездником является принц Люцерис Веларион.'},
    // {'name': 'Вермакс', 'description': 'Дракон принца Джекейриса Велариона. Его кожа имеет зелёный цвет, гребень и крылья красные. Становился раздражительным, когда находился рядом со снегом, льдом и холодом.'},
    // {'name': 'Лунная Плясунья', 'description': 'Молодая и яростная драконица Бейлы Таргариен, имеет полосатый окрас чешуи, коричневые гребни и перепонки. Очень быстрая, благодаря мощным крыльям.'},
    // {'name': 'Морской Дым', 'description': 'На валирийском языке его имя звучит как Эмброрбар. Еще молодой дракон, но уже успевший сменить двух всадников, первым из которых был Лейнор Веларион, затем — Аддамом из Халла. Цвет шкуры серебристо-серый, крылья с розоватыми перепонками, цвет пламени ярко-красный. Будучи еще очень молодым драконом демонстрирует куда большее проворство в воздухе, чем более взрослые сородичи. Сопоставимый по размеру с Тессарион, примерно втрое меньшей Вермитора.'},
    // {'name': 'Мелеис', 'description': 'Драконица, некогда принадлежащая принцессе Алиссе, а теперь принцессе Рейнис. За красный цвет чешуи и розовые перепонки крыльев Мелеис называют Красной Королевой. Гребень, рога и когти сверкают, как начищенная медь. Считается одним из самых быстрых драконов Вестероса, легко опережает Караксеса и Вхагар, но в последнее время немного обленилась, хотя в гневе все еще страшна.'},
    // {'name': 'Караксес', 'description': 'Также известен как Кровавый Змей — дракон принца Эймона Таргариена, а после его гибели — Деймона Таргариена. Свирепый, грозный, опытный зверь с ярко-красным цветом чешуи и крыльев, привыкший к огню и крови. Вдвое меньше Вхагар, но не менее яростный и более быстрый. Испытывает чрезвычайную для драконов привязанность к Сиракс, хозяйкой которой является Королева Рейнира, возлюбленная его наездника, принца Деймона.'},
    // {'name': 'Сиракс', 'description': 'Драконица Королевы Рейниры Таргариен, громадный и грозный зверь. Названа в честь одной из богинь Древней Валирии. Цвет чешуи, как и пламени - жёлтый и яркий, как восходящее солнце. Она тесно связана не только со своей наездницей, но и с Караксес, драконом Деймона Таргариена, дяди и мужа Рейниры.'},
    // {'name': 'Овцекрад', 'description': 'Дикий дракон с Драконьего Камня, злобный и со скверным характером. Он предпочитет баранину и часто совершает налеты на пастушьи отары, за что и получил своё прозвище от простонародья. С помощью хитрости и настойчивости его смогла приручить деревенская девушка Крапива.'}
    {'name': 'Арракс', 'originalName': 'Arrax', 'alias': 'Жемчужный Панцирь', 'description': 'Жемчужно-белый дракон с ярко-золотыми глазами. Его чешуя, переливающаяся как перламутр, и ярко-красные крылья выделяют его среди других драконов. Он под стать своему молодому наезднику, принцу Люцерису Велариону – амбициозен, но старается не лезть на рожон и избегает ненужных драк. Хотя его размеры гораздо меньше, чем у более старших драконов, его скорость частично компенсируют эту разницу, делая его весьма опасным соперником в небе.'},
    {'name': 'Вермакс', 'originalName': 'Vermax', 'alias': 'Страж Юга', 'description': 'Дракон принца Джекейриса Велариона, выделяется своим зелёным телом, ярко-красными гребнем и крыльями. Особенно вспыльчив и раздражителен в холодную погоду, плохо переносит прикосновение льда и снега. Несмотря на свой относительно молодой возраст, Вермакс уже зарекомендовал себя как надёжный и свирепый защитник. Его пламя, столь же яркое, как его окрас. Хотя он не достигает размеров старших драконов, его решимость и горячий нрав делают его грозным союзником в любом бою.'},
    {'name': 'Лунная Плясунья', 'originalName': 'Moondancer', 'alias': 'Ночная Гроза', 'description': 'Юная драконица Бейлы Таргариен, известна своим удивительным полосатым окрасом чешуи и мощными крыльями. Её гребни и перепонки коричневого цвета контрастируют с полосами на теле, придавая ей необычный вид, напоминающий лунный свет, пробивающийся сквозь облака. Её юность не ослабляет её ярость, благодаря чему в бою Лунная Плясунья проявляет неустрашимость, и рвётся вперёд под стать своей наезднице.'},
    {'name': 'Морской Дым', 'originalName': 'Seasmoke', 'alias': 'Серебристая Тень', 'description': 'На валирийском языке его имя звучит как Эмброрбар. Еще молодой дракон, но уже успевший сменить двух всадников, первым из которых был Лейнор Веларион, затем — Аддамом из Халла. Цвет шкуры серебристо-серый, крылья с розоватыми перепонками, цвет пламени ярко-красный. Будучи еще очень молодым драконом демонстрирует куда большее проворство в воздухе, чем более взрослые сородичи. Сопоставимый по размеру с Тессарион, примерно втрое меньшей Вермитора.'},
    {'name': 'Мелеис', 'originalName': 'Meleys', 'alias': 'Красная Королева', 'description': 'Драконица, некогда принадлежащая принцессе Алиссе, а теперь принцессе Рейнис. За красный цвет чешуи и розовые перепонки крыльев Мелеис называют Красной Королевой. Мелеис — одна из самых быстрых драконов Вестероса, её скорость в полёте опережала даже Караксеса и Вхагар, но с возрастом она утратила былую лёгкость. Тем не менее, в гневе она остаётся неукротимой силой, и её стремительный бросок с огненным вихрем может стереть целую армию за считанные мгновения.'},
    {'name': 'Караксес', 'originalName': 'Caraxes', 'alias': 'Кровавый Змей', 'description': 'Его чешуя пылает алыми оттенками, словно впитав в себя кровь всех павших на полях сражений. Его длинное и худое тело, непропорционально мощные крылья и яростный взгляд делают его устрашающим даже для других драконов. Караксес, благодаря своей физической форме, обладает необычайной маневренностью и скоростью в бою, превосходя по агрессии и жестокости многих своих сородичей. Ему не раз приходилось доказывать свою силу в кровавых битвах, что закалило его дух и сделало его одним из самых свирепых драконов своего времени. Он вдвое меньше Вхагар, но не менее яростный и более быстрый. Испытывает чрезвычайную для драконов привязанность к Сиракс, хозяйкой которой является Королева Рейнира, возлюбленная его наездника, принца Деймона.'},
    {'name': 'Сиракс', 'originalName': 'Syrax', 'alias': 'Ярость Солнца', 'description': 'Величественная драконица Королевы Рейниры Таргариен, сияет золотым пламенем и переливается чешуёй, словно утреннее солнце, поднимающееся над горизонтом. Её величественный жёлтый окрас, сочетающийся с ярким огнём, придаёт ей вид, достойной самой Валирии, в честь одной из богинь которой она и была названа. Хотя Сиракс проявляет особую привязанность не только к своей наезднице, но и к Караксес, дракону дяди и мужа Рейниры, она остаётся гордым и независимым существом, которое подчиняется только воле истинной Королевы.'},
    {'name': 'Овцекрад', 'originalName': 'Sheepstealer', 'alias': 'Ужас Драконьего Камня', 'description': 'Дикий дракон, ставший живой легендой среди местных жителей. Его шершавые чешуйки темны, как ночное небо, а глаза, полные алчности, фосфорицируют в темноте. Этот дракон предпочитает баранину и не упустит возможности налететь на пастушьи отары, оставляя за собой лишь панику, страх и обгоревшие кости. Овцекрад — не просто зверь, он олицетворяет дикий дух самой природы, который трудно подчинить. Лишь с помощью хитрости и настойчивости деревенская девушка Крапива смогла хоть и не покорить, но приручить этого свирепого Зверя.'}
  ]
]

let cellListFirstPlayer = [];
let cellListSecondPlayer = [];

const fillList = () => {
  let index = 0;
  let list = cellListFirstPlayer;
  for (let i = 1; i <= 2; i++) {
    for (let j = 0; j < cardsPower.length; j++) {
      if (i === 2) {
        list = cellListSecondPlayer;
      }
      list.push({
        index: index,
        type: i,
        value: cardsPower[j],
        icon: '',
        display: true,
        player: 0,
        win: false,
        img: j + 1,
        name: dragonsList[i - 1][j].name,
        originalName: dragonsList[i - 1][j].originalName,
        alias: dragonsList[i - 1][j].alias,
        description: dragonsList[i - 1][j].description
      });
      index++;
    }
  }
}
fillList();

const shuffleList = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
cellListFirstPlayer = shuffleList(cellListFirstPlayer);
cellListSecondPlayer = shuffleList(cellListSecondPlayer);

const AppProvider = (({children}) => {
    const bonuses = {
        '1': [
          {bonus: 'attack', icon: 'sword', description: 'ярость дракона', additionalDescription: 'удваивает силу атаки'},
          {bonus: 'guard', icon: 'shield', description: 'благословение семерых', additionalDescription: 'дракон не пострадает, если противник окажется сильнее'},
          {bonus: 'spy', icon: 'spyglass', description: 'разведка позиций', additionalDescription: 'просмотр любой карты'},
          {bonus: 'x2', icon: 'x2', description: 'высокие ставки', additionalDescription: 'удваивает количество полученных или потеряннх очков'},
          {bonus: 'change', icon: 'change', description: 'пропуск хода', additionalDescription: ''}
        ],
        '2': [
          {bonus: 'attack', icon: 'sword', description: 'ярость дракона', additionalDescription: 'удваивает силу атаки'},
          {bonus: 'guard', icon: 'shield', description: 'благословение семерых', additionalDescription: 'дракон не пострадает, если противник окажется сильнее'},
          {bonus: 'spy', icon: 'spyglass', description: 'разведка позиций', additionalDescription: 'просмотр любой карты'},
          {bonus: 'x2', icon: 'x2', description: 'высокие ставки', additionalDescription: 'удваивает количество полученных или потеряннх очков'},
          {bonus: 'change', icon: 'change', description: 'пропуск хода', additionalDescription: ''}
        ]
    };
    
    const bonusesPointsDefault = {
        attack: {1: 0, 2: 0},
        guard: {1: 0, 2: 0},
        spy: {1: 0, 2: 0},
        x2: {1: 0, 2: 0}
    };
    
    const [cellsFirstPlayer, setCellsFirstPlayer] = useState(cellListFirstPlayer);
    const [cellsSecondPlayer, setCellsSecondPlayer] = useState(cellListSecondPlayer);
    const [active, setActive] = useState([]);
    const [openedCardsCount, setOpenedCardsCount] = useState(0);
    const [openedCards, setOpenedCards] = useState([
        {type: 0, value: 0, index: 0, icon: ''},
        {type: 0, value: 0, index: 0, icon: ''}
    ]);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [playersScore, setPlayersScore] = useState({1: 0, 2: 0});
    const [dragging, setDragging] = useState(null);
    const [firstPlayerIsReady, setFirstPlayerIsReady] = useState(false);
    const [secondPlayerIsReady, setSecondPlayerIsReady] = useState(false);
    const [firstPlayerName, setFirstPlayerName] = useState('Игрок 1');
    const [secondPlayerName, setSecondPlayerName] = useState('Игрок 2');
    const [showCards, setShowCards] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [playerNameInputSelected, setPlayerNameInputSelected] = useState(false);
    const [roundIsFinished, setRoundIsFinished] = useState(false);
    const [activatedBonuses, setActivatedBonuses] = useState([]);
    const [usedBonuses, setUsedBonuses] = useState([]);
    const [notUsedBonuses, setNotUsedBonuses] = useState([]);
    const [spyActive, setSpyActive] = useState(false);
    const [description, setDescription] = useState('');
    const [additionalDescription, setAdditionalDescription] = useState('');
    const [showDescription, setShowDescription] = useState(false);
    const [roundsCounter, setRoundsCounter] = useState(1);
    const [bonusesPoints, setBonusesPoints] = useState(bonusesPointsDefault);
    const [notUsedBonusesList, setNotUsedBonusesList] = useState([]);
    const [gettingBonusesList, setGettingBonusesList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState({'value': 0, 'type': 0});
    const [showModalDescription, setShowModalDescription] = useState(true);
    const [appBackground, setAppBackground] = useState('greens');
    const [backgroundShadowOpacity, setBackgroundShadowOpacity] = useState('0');
    const [opacityMainframeBlock, setOpacityMainframeBlock] = useState('0');
      
    const value = {
        activeCards: active, setActive,
        openedCardsCount, setOpenedCardsCount,
        openedCards, setOpenedCards,
        currentPlayer, setCurrentPlayer,
        playersScore, setPlayersScore,
        cellsFirstPlayer, setCellsFirstPlayer,
        cellsSecondPlayer, setCellsSecondPlayer,
        activatedBonuses, setActivatedBonuses,
        usedBonuses, setUsedBonuses,
        spyActive, setSpyActive,
        cellListFirstPlayer,
        cellListSecondPlayer,
        roundIsFinished, setRoundIsFinished,
        firstPlayerIsReady, setFirstPlayerIsReady,
        secondPlayerIsReady, setSecondPlayerIsReady,
        description, setDescription,
        additionalDescription, setAdditionalDescription,
        showDescription, setShowDescription,
        roundsCounter, setRoundsCounter,
        showButtons, setShowButtons,
        bonusesPoints, setBonusesPoints,
        bonusesPointsDefault,
        setNotUsedBonusesList,
        gettingBonusesList, setGettingBonusesList,
        dragging, setDragging,
        playerNameInputSelected, setPlayerNameInputSelected,
        showCards, setShowCards,
        firstPlayerName, setFirstPlayerName,
        secondPlayerName, setSecondPlayerName,
        bonuses,
        notUsedBonuses,
        showModal, setShowModal,
        modalValue, setModalValue,
        showModalDescription, setShowModalDescription,
        appBackground, setAppBackground,
        backgroundShadowOpacity, setBackgroundShadowOpacity,
        opacityMainframeBlock, setOpacityMainframeBlock,
        dragonsList
    }

    const checkNotUsedBonuses = () => {
        let newNotUsedBonuses = [...notUsedBonuses];
        bonuses['1'].forEach((item, index) => {
          if (item.bonus !== 'change') {
            for (let i = 1; i <= 2; i++) {
              let findUsedBonus = usedBonuses.find(
                (usedBonus) => 
                    usedBonus.bonus === item.bonus &&
                    usedBonus.player === i
              );
              let findedIndex = newNotUsedBonuses.findIndex(
                (notUsedBonus) =>
                  notUsedBonus.bonus === item.bonus &&
                  notUsedBonus.player === i
              );
              if (!findUsedBonus) {
                if (findedIndex > -1) {
                  newNotUsedBonuses[findedIndex].count += 1;
                } else {
                  newNotUsedBonuses.push({
                    index: index,
                    bonus: item.bonus,
                    player: i,
                    count: 1
                  });
                }
              } else {
                if (findedIndex > -1) {
                  newNotUsedBonuses.splice(findedIndex, 1);
                }
              }
            }
          }
        });
        setNotUsedBonuses(newNotUsedBonuses);
    };
    
    const addScore = (player) => {
        document.querySelector(`.${classesSideframe['player-score']}[data-player="${player}"]`).classList.add(classesSideframe['add']);
        setTimeout(() => {
          document.querySelector(`.${classesSideframe['player-score']}[data-player="${player}"]`).classList.remove(classesSideframe['add']);
        }, 500);
    };
    
    useEffect(() => {
        if (cellsFirstPlayer.filter((item) => item.display).length === 0) {
          setTimeout(() => {
            setRoundIsFinished(true);
            checkNotUsedBonuses();
          }, 2000);
        }
    }, [cellsFirstPlayer]);
    
    useEffect(() => {
        let updatedPoints = {...bonusesPoints};
        notUsedBonuses.forEach((i) => {
          updatedPoints[i.bonus][i.player] = i.count;
        });
        setBonusesPoints(updatedPoints);
    }, [notUsedBonuses]);
    
    useEffect(() => {
        let newBonusesList = [];
        for (const key in bonusesPoints) {
          if (bonusesPoints[key][1] > 0 || bonusesPoints[key][2] > 0) {
            newBonusesList.push(key);
          }
        }
        setNotUsedBonusesList(newBonusesList);
    }, [bonusesPoints]);
    
    useEffect(() => {
        let timeout = Math.max(0, notUsedBonusesList.length * 2000 - 500);
        setTimeout(() => {
          const delay = (ms) =>
            new Promise((resolve) => setTimeout(resolve, ms));
          const iterateList = async (list) => {
            for (const item of list) {
              setGettingBonusesList((prevList) => [...prevList, item]);
              for (let player = 1; player <= 2; player++) {
                if (bonusesPoints[item][player] > 0) {
                  setPlayersScore((prevScores) => {
                    const newScore = prevScores[player] + bonusesPoints[item][player];
                    addScore(player);
                    return {
                        ...prevScores,
                        [player]: newScore,
                    };
                  });
                }
              }
              await delay(2000);
            }
          };
          iterateList(notUsedBonusesList);
          if (roundIsFinished) {
            setTimeout(() => {
              setShowButtons(true);
            }, timeout);
          }
        }, 2000);
    }, [notUsedBonusesList]);

    return (
        <AppContext.Provider
            value={value}>
            {children}
        </AppContext.Provider>
    )
});

export {AppProvider, useAppContext};