/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {  
    en: {
        translation: {
            GET_FRASES_MSG: 'Something curious about Amsterdam is that it has more canals than Venice...',
            GET_FRASES_MSGSalida: '... you can ask for another fun fact about Amsterdam... say "tell me a fun fact about Amsterdam" ... or if you want to stop me just say, Cancel! ...so...how can I help you?',
            WELCOME_MESSAGE: 'Welcome to Amsterdam Guide, you can say Hello or Help. Which would you like to try?',
            HELLO_MESSAGE: 'Hello Amsterdam Enthusiast!',
            HELP_MESSAGE: 'You can say hello to me! How can I help you learn about Amsterdam?',
            GOODBYE_MESSAGE: 'Goodbye, enjoy your time in Amsterdam!',
            REFLECTOR_MESSAGE: 'You just triggered %s in Amsterdam Guide',
            FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again with a different question about Amsterdam.',
            ERROR_MESSAGE: 'Sorry, there was an error. Please try again when asking about Amsterdam.',
            INTRODUCCION_MESSAGE : 'Amsterdam, the capital of the Netherlands, is a vibrant city full of history. Known as the "Venice of the North" for its canals and bridges, Amsterdam is also famous for its liberal atmosphere, rich culture and wide variety of tourist attractions.',
            LUGARES_MESSAGE: 'Amsterdam Canals: A boat ride through the canals is one of the best ways to see the city. You can rent a boat or take a guided tour.Dam Square: Dam Square is the main square in Amsterdam and is home to the Royal Palace, the Nieuwe Kerk and the National Monument. Van Gogh Museum: The Van Gogh Museum houses the largest collection of works by Vincent van Gogh in the world. Anne Frank House: The Anne Frank House is the place where Anne Frank and her family hid from the Nazis during World War II. Heineken Experience: The Heineken Experience is an interactive museum that teaches you about the history of Heineken beer.',
            COMIDA_MESSAGE: 'Stroopwafel: A thin waffle with caramel in the middle. Poffertjes: Small Dutch pancakes served with powdered butter and icing sugar. Haring: Raw herring served with chopped onion and pickles. Stamppot: A stew of potatoes, vegetables and meat. Bitterballen: Meat or cheese croquettes.',
            TRAJE_MESSAGE:'There is no official traditional costume in Amsterdam, but traditional Dutch clothing includes: Clogs: Wooden shoes. Volendam Costume: A traditional costume from the Volendam region, consisting of a long, colorful dress for women and black pants and a white shirt for men.',
            PERSONAJES_MESSAGE: 'The most famous people in Amsterdam are: Anne Frank: A Jewish girl who kept a diary during World War II. Rembrandt van Rijn: A painter famous for his portraits and landscapes. Vincent van Gogh: A painter famous for his post-impressionist works. Willem-Alexander: The current king of the Netherlands. Desiderius Erasmus: A philosopher, theologian and humanist of the Renaissance.',
            MUSICA_MESSAGE: 'Dutch music is very diverse, but some of the most popular genres include: Folk music: Dutch folk music is characterized by its simple melodies and lyrics about rural life. Classical music: The Netherlands has given the world some of the most famous composers in history, such as Johannes Vermeer and Anton van Dyck. Jazz: Jazz is very popular in Amsterdam, and there are many jazz clubs in the city. Electronic music: Amsterdam is one of the most important cities in the world for electronic music.',
            APLINTRO_MESSAGE : 'Amsterdam guide',
            APLCOMIDA_MESSAGE : 'Traditional food in Amsterdam',
            APLTRAJE_MESSAGE : ' Traditional clothing in Amsterdam',
            APLPERSONAJES_MESSAGE : 'Famous characters',
            APLMUSICA_MESSAGE : 'Famous Music',
            APLFOOTER_MESSAGE : 'Try: "Alexa, places to visit in Amsterdam"',
            Zapatos: 'Clogs',
            ZapatosDesc: 'Wooden shoes',
            Vestimenta: 'Volendam Costume',
            VestimentaDesc: 'A traditional costume from the Volendam region, consisting of a long, colorful dress for women and black pants and a white shirt for men.',
            Lugar1: 'Ámsterdam Canals',
            Lugar2: 'Dam Square',
            Lugar3:'Van Gogh Museum',
            Lugar4:'Anne Frank House',
            Lugar5:'Heineken Experience',
            Lugares: 'Places to visit',
            HELP_MESSAGEN : 'You can use these options',
            frase1: 'places to visit in Amsterdam',
            frase2: 'food in Amsterdam',
            frase3: 'famous characters of Amsterdam',
            frase4: 'popular music in Amsterdam'
        }
    },
    
    es: {
        translation: {
            GET_FRASES_MSG: 'Un dato interesante de Ámsterdam es que tiene más canales que Venecia...',
            GET_FRASES_MSGSalida: '... puedes pedir otro dato curioso sobre Ámsterdam... di "dime un dato curioso de Ámsterdam" ... o si deseas detenerme solo di, ¡Cancela! ... entonces ... ¿cómo te puedo ayudar?',
            WELCOME_MESSAGE: 'Bienvenido a la guía de Ámsterdam, puedes decir Hola o Ayuda. ¿Cuál prefieres?',
            HELLO_MESSAGE: '¡Hola entusiasta de Ámsterdam!',
            HELP_MESSAGE: 'Puedes decirme hola. ¿Cómo te puedo ayudar a conocer más sobre Ámsterdam?',
            GOODBYE_MESSAGE: '¡Adiós, disfruta tu tiempo en Ámsterdam!',
            REFLECTOR_MESSAGE: 'Acabas de activar %s en la guía de Ámsterdam',
            FALLBACK_MESSAGE: 'Lo siento, no sé nada sobre eso. Por favor intenta otra vez con una pregunta diferente sobre Ámsterdam.',
            ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor intenta otra vez cuando preguntes sobre Ámsterdam.',
            INTRODUCCION_MESSAGE: 'Ámsterdam, la capital de los Países Bajos, es una ciudad vibrante y llena de historia. Conocida como la "Venecia del Norte" por sus canales y puentes, Ámsterdam también es famosa por su ambiente liberal, su rica cultura y su gran variedad de atracciones turísticas.',
            LUGARES_MESSAGE:'Canales de Ámsterdam: Un paseo en barco por los canales es una de las mejores maneras de ver la ciudad. Puedes alquilar un barco o tomar un tour guiado. Plaza Dam: La Plaza Dam es la plaza principal de Ámsterdam y alberga el Palacio Real, el Nieuwe Kerk y el Monumento Nacional.Plaza Dam: La Plaza Dam es la plaza principal de Ámsterdam y alberga el Palacio Real, el Nieuwe Kerk y el Monumento Nacional. Museo Van Gogh alberga la mayor colección de obras de Vincent van Gogh del mundo. Casa de Ana Frank: La Casa de Ana Frank es el lugar donde Ana Frank y su familia se escondieron de los nazis durante la Segunda Guerra Mundial. Heineken Experience: La Heineken Experience es un museo interactivo que te enseña sobre la historia de la cerveza Heineken.',
            COMIDA_MESSAGE: 'Stroopwafel: Un gofre delgado con caramelo en el medio. Poffertjes: Pequeños panqueques holandeses que se sirven con mantequilla en polvo y azúcar glas. Haring: Arenque crudo que se sirve con cebolla picada y pepinillos. Stamppot: Un guiso de patatas, verduras y carne. Bitterballen: Croquetas de carne o queso.',
            TRAJE_MESSAGE: 'No hay un traje típico oficial en Ámsterdam, pero la ropa tradicional holandesa incluye: Zuecos: Zapatos de madera. Traje de Volendam: Un traje tradicional de la región de Volendam, que consiste en un vestido largo y colorido para las mujeres y pantalones negros y una camisa blanca para los hombres.',
            PERSONAJES_MESSAGE: 'Los personajes más famosos de Ámsterdam son:  Ana Frank: Una niña judía que escribió un diario durante la Segunda Guerra Mundial. Rembrandt van Rijn: Un pintor famoso por sus retratos y paisajes. Vincent van Gogh: Un pintor famoso por sus obras postimpresionistas. Willem-Alexander: El actual rey de los Países Bajos. Desiderius Erasmus: Un filósofo, teólogo y humanista del Renacimiento.',
            MUSICA_MESSAGE: 'La música holandesa es muy diversa, pero algunos de los géneros más populares incluyen: Música folk: La música folk holandesa se caracteriza por sus melodías simples y letras sobre la vida rural. Música clásica: Los Países Bajos han dado al mundo algunos de los compositores más famosos de la historia, como Johannes Vermeer y Anton van Dyck. Jazz: El jazz es muy popular en Ámsterdam, y hay muchos clubes de jazz en la ciudad. Música electrónica: Ámsterdam es una de las ciudades más importantes del mundo para la música electrónica.',
            APLINTRO_MESSAGE : 'Guía de Amsterdam',
            APLCOMIDA_MESSAGE : 'Comida tradicional en Ámsterdam',
            APLTRAJE_MESSAGE : 'Vestimenta tradicional en Ámsterdam',
            APLPERSONAJES_MESSAGE : 'Personajes famosos',
            APLMUSICA_MESSAGE : 'Música famosa',
            APLFOOTER_MESSAGE : 'Intenta con "Alexa, que lugares visitar en Amsterdam"',
            Zapatos: 'Zuecos',
            ZapatosDesc: 'Zapatos de madera',
            Vestimenta: 'Traje de Volendam',
            VestimentaDesc: 'Un traje tradicional de la región de Volendam, que consiste en un vestido largo y colorido para las mujeres y pantalones negros y una camisa blanca para los hombres.',
            Lugar1: 'Canales de Ámsterdam',
            Lugar2: 'Plaza Dam',
            Lugar3:'Museo Van Gogh',
            Lugar4:'Casa de Ana Frank',
            Lugar5:'Heineken Experience',
            Lugares: 'Lugares para visitar',
            HELP_MESSAGEN : 'Puedes usar estas opciones',
            frase1: 'que es Amsterdam',
            frase2: 'que lugares visitar en Amsterdam',
            frase3: 'comida en Ámsterdam',
            frase4: 'ropa típica en Amsterdam'
            
        }
    }
};
const DOCUMENT_IDIntro = "IntroduccionIntent";
const DOCUMENT_IDLugares = "LugaresIntent";
const DOCUMENT_IDComida = "Comida";
const DOCUMENT_IDTraje = "TrajeIntent";
const DOCUMENT_IDPersonajes = "PersonajesIntent";
const DOCUMENT_IDMusica = "MusicaIntent";
const DOCUMENT_IDCancelar = "Cancelar";
const DOCUMENT_IDH = "HelpIntent";
const DOCUMENT_IDLaunch = "LaunchIntentRequest";

const getDatasourceIntro = (headerTitle) => {
    return {
        "videoPlayerTemplateData": {
            "type": "object",
            "properties": {
                "backgroundImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T19%3A50%3A56.603Z",
                "displayFullscreen": false,
                "headerTitle": headerTitle,
                "headerSubtitle": "",
                "logoUrl": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T19%3A50%3A56.603Z",
                "videoControlType": "none",
                "videoSources": [
                    "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/videoplayback.mp4?t=2024-07-02T19%3A48%3A03.631Z"
                ],
                "sliderType": "determinate"
            }
        }
    };
};
const getDatasourcePersonajes = (headerTitle) => {
    return{
         "gridListData": {
        "type": "object",
        "objectId": "gridListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T19%3A50%3A56.603Z",
                    "size": "small",
                    "widthPixels": 0,
                    "heightPixels": 0
                },
                {
                    "url": "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/gridlist/GridListBackground_Dark.png",
                    "size": "large",
                    "widthPixels": 0,
                    "heightPixels": 0
                }
            ]
        },
        "title": headerTitle,
        "listItems": [
            {
                "primaryText": "Ana Frank",
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/p1.jpg?t=2024-07-02T23%3A40%3A34.918Z"
            },
            {
                "primaryText": "Rembrandt van Rijn",
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/p2.jpg?t=2024-07-02T23%3A40%3A42.249Z"
            },
            {
                "primaryText": "Vincent van Gogh",
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/p3.jpg?t=2024-07-02T23%3A40%3A49.406Z"
            },
            {
                "primaryText": "Willem-Alexander",
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/p4.jpg?t=2024-07-02T23%3A41%3A26.081Z"
            },
            {
                "primaryText": "Desiderius Erasmus",
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/p5.jpg?t=2024-07-02T23%3A41%3A36.970Z"
            }
        ],
        "logoUrl": ""
    }
    }
}

const getDatasourceLugares = (headerTitle, Lugar1, Lugar2, Lugar3, Lugar4, Lugar5) => {

    return{
        "imageListData": {
        "type": "object",
        "objectId": "imageListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T19%3A50%3A56.603Z",
                    "size": "large"
                }
            ]
        },
        "title": headerTitle,
        "listItems": [
            {
                "primaryText": Lugar1,
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/1.jpg?t=2024-07-02T21%3A18%3A45.616Z"
            },
            {
                "primaryText": Lugar2,
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/2.jpg"
            },
            {
                "primaryText": Lugar3,
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/3.jpg?t=2024-07-02T21%3A19%3A28.861Z"
            },
            {
                "primaryText": Lugar4,
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/4.jpg?t=2024-07-02T21%3A19%3A37.590Z"
            },
            {
                "primaryText": Lugar5,
                "imageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/5.jpg?t=2024-07-02T21%3A19%3A45.238Z"
            }
        ],
        "logoUrl": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T19%3A50%3A56.603Z",
        "hintText": "Try, \"Alexa, select number 1\""
    }
    }
}

const getDatasourceTraje = (headerTitle, zapatos, vestimenta, ZapatosDesc, VestimentaDesc) =>{
    return{
        "cardsLayoutTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T19%3A50%3A56.603Z",
            "headerTitle": "",
            "headerSubtitle": "",
            "headerAttributionImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T19%3A50%3A56.603Z",
            "primaryText": headerTitle,
            "listItems": [
                {
                    "primaryText": zapatos,
                    "thumbnailImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/Zuecos.jpg?t=2024-07-02T22%3A21%3A58.396Z",
                    "secondaryText": ZapatosDesc

                },
                {
                    "primaryText": vestimenta,
                    "thumbnailImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/Traje.jpg?t=2024-07-02T22%3A22%3A24.897Z",
                    "secondaryText": VestimentaDesc

                }
            ]
        }
    }
    }
}
const getDatasourceComida = (headerTitle)=>{
    return{
        "cardsLayoutTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T19%3A50%3A56.603Z",
            "headerTitle": "",
            "headerSubtitle": "",
            "headerAttributionImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T19%3A50%3A56.603Z",
            "primaryText": headerTitle,
            "listItems": [
                {
                    "primaryText": "Stroopwafel",
                    "thumbnailImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/c1.jpg?t=2024-07-02T21%3A41%3A32.090Z"
                },
                {
                    "primaryText": "Poffertjes",
                    "thumbnailImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/c2.jpg?t=2024-07-02T21%3A41%3A57.814Z"
                },
                {
                    "primaryText": "Haring",
                    "thumbnailImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/c3.jpg?t=2024-07-02T21%3A42%3A11.464Z"
                },
                {
                    "primaryText": "Stamppot",
                    "thumbnailImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/c4.jpg?t=2024-07-02T21%3A42%3A23.511Z"
                },
                {
                    "primaryText": "Bitterballen",
                    "thumbnailImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/c5.jpg?t=2024-07-02T21%3A42%3A37.426Z"
                }
            ]
        }
    }
    }
}

const getDatasourceMusica = (headerTitle) => {
    return{
        "audioPlayerTemplateData": {
        "type": "object",
        "properties": {
            "audioControlType": "none",
            "audioSources": [
                "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/Y2meta.app___Rowwen_Heze____Onderaan_Beginne_DE_WEI_IN_(320_kbps).mp3?t=2024-07-03T00%3A22%3A46.767Z"
            ],
            "backgroundImage": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T23%3A55%3A00.334Z",
            "coverImageSource": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/free_tour_barrio_rojo_de_amsterdam_en_espanol_01.png",
            "headerTitle": headerTitle,
            "logoUrl": "https://d2o906d8ln7ui1.cloudfront.net/images/response_builder/logo-world-of-plants-2.png",
            "primaryText": "Onderaan Beginne DE WEI IN",
            "secondaryText": "Rowwen Heze",
            "sliderType": "determinate"
        }
    }
    }
}

const getDatasourceCancelar = (headerTitle, footerTitle) =>{
    return{
         "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T23%3A55%3A00.334Z",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": headerTitle
                }
            },
            "logoUrl": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T23%3A55%3A00.334Z",
            "hintText": footerTitle
        }
    }
    }
}

const getDatasourceHelp = (headerTitle, frase1, frase2, frase3, frase4) =>{
    return{
        "textListData": {
        "type": "object",
        "objectId": "textListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T23%3A55%3A00.334Z",
                    "size": "large"
                }
            ]
        },
        "title": "La casa del marisco",
        "listItems": [
            {
                "primaryText": headerTitle
            },
            {
                "primaryText": "\""+frase1
            },
            {
                "primaryText": "\""+frase2
            },
            {
                "primaryText": "\""+frase3
            },
            {
                "primaryText": "\""+frase4
            }
        ],
        "logoUrl": "https://scontent.fmex10-1.fna.fbcdn.net/v/t39.30808-6/292516079_132638876119670_559404240699732234_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGUCM-wt0WZvQZt6cOyEOd0Sp3N4cOKXKJKnc3hw4pcogKyhc10zrVKzcpgOeY2TFsa1NEhd0p37nqiatuT_t4j&_nc_ohc=TtNvsJIKvMcQ7kNvgHsg_2G&_nc_zt=23&_nc_ht=scontent.fmex10-1.fna&oh=00_AYCqeJ1cZhiHmUKb1a7STuAGTcZx9YrInqDOz-u6L6H40A&oe=66829CFE"
    }
    }
}

const getDatasourceLaunch = (headerTitle,footerTitle)=>{
    return{
         "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T23%3A55%3A00.334Z",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": headerTitle
                }
            },
            "logoUrl": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T23%3A55%3A00.334Z",
            "hintText": footerTitle
        }
    }
    }
}

const DOCUMENT_IDError = "Error";

const datasourceError = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T23%3A55%3A00.334Z",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Error"
                }
            },
            "logoUrl": "https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/amsterdam_canales_puentes_hd.jpg?t=2024-07-02T23%3A55%3A00.334Z",
            "hintText": ""
        }
    }
};
const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const IntroduccionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntroduccionIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('INTRODUCCION_MESSAGE');
        const headerTitle = requestAttributes.t('APLINTRO_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const datasourceIntro = getDatasourceIntro(headerTitle);
            const aplDirective = createDirectivePayload(DOCUMENT_IDIntro, datasourceIntro);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const LugaresIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LugaresIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('LUGARES_MESSAGE');
        const headerTitle = requestAttributes.t('Lugares');
        const Lugar1 = requestAttributes.t('Lugar1');
        const Lugar2 = requestAttributes.t('Lugar2');
        const Lugar3 = requestAttributes.t('Lugar3');
        const Lugar4 = requestAttributes.t('Lugar4');
        const Lugar5 = requestAttributes.t('Lugar5');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const datasourceLugares = getDatasourceLugares(headerTitle, Lugar1, Lugar2,Lugar3, Lugar4, Lugar5);
            const aplDirective = createDirectivePayload(DOCUMENT_IDLugares, datasourceLugares);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ComidaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ComidaIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('COMIDA_MESSAGE');
        const headerTitle = requestAttributes.t('APLCOMIDA_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const datasourceComida= getDatasourceComida(headerTitle);
            const aplDirective = createDirectivePayload(DOCUMENT_IDComida, datasourceComida);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const TrajeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TrajeIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('TRAJE_MESSAGE');
        const Zapatos = requestAttributes.t('Zapatos');
        const ZapatosDesc = requestAttributes.t('ZapatosDesc');
        const Vestimenta = requestAttributes.t('Vestimenta');
        const headerTitle = requestAttributes.t('APLTRAJE_MESSAGE');

        const VestimentaDesc = requestAttributes.t('VestimentaDesc');

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const datasourceTraje= getDatasourceTraje(headerTitle, Zapatos, ZapatosDesc, Vestimenta, VestimentaDesc);
            const aplDirective = createDirectivePayload(DOCUMENT_IDTraje, datasourceTraje);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const PersonajesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PersonajesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('PERSONAJES_MESSAGE');
        const headerTitle = requestAttributes.t('APLPERSONAJES_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const datasourcePersonajes = getDatasourcePersonajes(headerTitle);
            const aplDirective = createDirectivePayload(DOCUMENT_IDPersonajes, datasourcePersonajes);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const MusicaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MusicaIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('MUSICA_MESSAGE');
        
         const headerTitle = requestAttributes.t('APLMUSICA_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const datasourceMusica = getDatasourceMusica(headerTitle);
            const aplDirective = createDirectivePayload(DOCUMENT_IDMusica, datasourceMusica);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        const headerTitle = requestAttributes.t('WELCOME_MESSAGE');
        const footerTitle = requestAttributes.t('APLFOOTER_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const datasourceLaunch = getDatasourceLaunch(headerTitle,footerTitle);
            const aplDirective = createDirectivePayload(DOCUMENT_IDLaunch, datasourceLaunch);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');
        const headerTitle = requestAttributes.t('HELLO_MESSAGE');
        const footerTitle = requestAttributes.t('APLFOOTER_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const datasourceLaunch = getDatasourceLaunch(headerTitle,footerTitle);
            const aplDirective = createDirectivePayload(DOCUMENT_IDLaunch, datasourceLaunch);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        const frase1 = requestAttributes.t('frase1');
        const frase2 = requestAttributes.t('frase2');
        const frase3 = requestAttributes.t('frase3');
        const frase4 = requestAttributes.t('frase4');
        const headerTitle = requestAttributes.t('HELP_MESSAGEN');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
           const datasourceHelp = getDatasourceHelp(headerTitle, frase1, frase2,frase3, frase4);
            const aplDirective = createDirectivePayload(DOCUMENT_IDH, datasourceHelp);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');
        const headerTitle = requestAttributes.t('GOODBYE_MESSAGE');
        const footerTitle = requestAttributes.t('APLFOOTER_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            
            const datasourceCancelar = getDatasourceCancelar(headerTitle,footerTitle);
            const aplDirective = createDirectivePayload(DOCUMENT_IDCancelar, datasourceCancelar);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t(`REFLECTOR_MESSAGE ${intentName}`);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_IDError, datasourceError);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        IntroduccionIntentHandler,
        LugaresIntentHandler,
        ComidaIntentHandler,
        TrajeIntentHandler,
        PersonajesIntentHandler,
        MusicaIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
        .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();