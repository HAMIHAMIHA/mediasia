import { useState} from 'react';
import Map,{Marker} from 'react-map-gl';
import Image from "next/image";
import plan_situation from "../../public/styles/src/page2/plan_situation@2x.png"
import Logo_hill_png from '../../public/styles/src/page2/logo_hill_side.png'
// import { text } from 'stream/consumers';



//4.改变颜色全部变化。


const Block = () => {
    return <>
        {/* page1 */}
        <Block1_1 
        text0={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text1={"LE BUREAU EN RÉGION PAR COGEDIM"} 
        text2={["Premier promoteur en immobilier d'entreprise à l'échelle nationale, ","Cogedim ","développe des opérations de bureau partout en France autour de 3 pôles majeurs : ","la prestation de services, les immeubles clés en main utilisateur et l'investissement.","Le Groupe a pour vocation d'","accompagner les entreprises de toutes tailles ","dans leur stratégie d'implantation régionale dans un contexte où les modes de travail se transforment et les enjeux de développement durable sont prépondérants."]}
        text3={[
        "       ",
        "Imaginer le futur de l'immobilier d'entreprise"]}
        text4={"Découvrez nos projets immobiliers par région"}
        text5={["Auvergne Rhône-Alpes", "Bourgogne Franche-Comté","Bretagne", "Centre Val de Loire","Grand Est","Hauts-de-France","Normandie","Nouvelle Aquitaine","Occitanie","Pays de la Loire","Provence Alpes Côte d'Azur"]}
        propramme={["program1","program2","program3"]}
        introduce={"Les données recueillies ci-dessus sont nécessaires pour nous permettre de répondre à votre demande de renseignement dans le cadre de la commercialisation des programmes par Cogedim Provence. Pour en savoir plus sur le traitement de vos données et vos droits, cliquer ici."}
        
        />

        <Block1_2 
        number1={57}
        text1={"programmes en cours"}
        text2={[
        "Hill Side - Toulouse",
        "Boréal - Lyon 7","EMH - Villeurbanne",
        "Commercialisation en cours"]}
        text3={[
        "Surface","31 000 m2 SDP",
        "Livraison","3e trimestre 2020"]}
        />
        <Block1_3 
        text1={[
        "Une culture entrepreneuriale",
        "Animé par une véritable culture entrepreneuriale",
        ", Cogedim a développé un fort ancrage territorial, gage d'une croissance durable. Acteur clé de la ville, au contact des métropoles et de leurs territoires, nous offrons à nos clients des solutions urbaines et immobilières à taille humaine. ",
        "Nous contacter",
        "L'immobilier d'entreprise au servive du développement des territoires.",
        ]}
        />
        <Block1_4
        text1={"Ils nous ont fait confiance"}
        />
        <Footer
        text1={["UNE MARQUE ALTAREA","Vous avez besoin de plus d'informations ?","Nous contacter"]}
        text2={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text3={["Visitez le site"," Altarea"," et le site"," Cogedim pour les Particuliers","Copyright Altarea 2022 - Mentions Légales"]}
        />
        {/* page2 */}
        <Block2_1
        text0={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text1={"OCCITANIE"} 
        text2={["Filiale toulousaine du Groupe Altarea, notre Direction régionale est implantée au cœur de la ville de Toulouse.","Notre équipe de 52 collaborateurs est impliquée quotidiennement dans le développement de notre territoire. Nous développons localement des projets immobiliers qualitatifs empreints de l'identité architecturale et des spécificités de la métropole Toulousaine et des villes de la région Occitanie."]}
        text3={[
        "       ",
        "Découvrez nos offres de bureau en région"]}
        text4={"Découvrez nos projets immobiliers par région"}
        text5={["Auvergne Rhône-Alpes", "Bourgogne Franche-Comté","Bretagne", "Centre Val de Loire","Grand Est","Hauts-de-France","Normandie","Nouvelle Aquitaine","Occitanie","Pays de la Loire","Provence Alpes Côte d'Azur"]}
        propramme={["program1","program2","program3"]}
        introduce={"Les données recueillies ci-dessus sont nécessaires pour nous permettre de répondre à votre demande de renseignement dans le cadre de la commercialisation des programmes par Cogedim Provence. Pour en savoir plus sur le traitement de vos données et vos droits, cliquer ici."}
        />
        <Block2_2 
        number1={57}
        text1={"programmes en cours"}
        text2={[
        "Hill Side - Toulouse",
        "Boréal - Lyon 7","EMH - Villeurbanne",
        "Commercialisation en cours"]}
        text3={[
        "Surface","31 000 m2 SDP",
        "Livraison","3e trimestre 2020"]}
        />
        <Footer
        text1={["UNE MARQUE ALTAREA","Vous avez besoin de plus d'informations ?","Nous contacter"]}
        text2={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text3={["Visitez le site"," Altarea"," et le site"," Cogedim pour les Particuliers","Copyright Altarea 2022 - Mentions Légales"]}
        />
        {/* page3 */}
        <Block3_1
        text0={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text1={"Idéalement situé face au Quartier Guillemet, Hill Side est à la croisée de l'hypercentre et des faubourgs de la ville."}
        text2={["Surface","Livraison","Stade","SDP","trimestre"]} 
        number1={[4330,3,2023]}
        text3={["Travaux"]}
        text4={"Découvrez nos projets immobiliers par région"}
        text5={["Auvergne Rhône-Alpes", "Bourgogne Franche-Comté","Bretagne", "Centre Val de Loire","Grand Est","Hauts-de-France","Normandie","Nouvelle Aquitaine","Occitanie","Pays de la Loire","Provence Alpes Côte d'Azur"]}
        text6={["Hill Side"]}
        />

        <Block3_2
        text1={"Plan de situation"}
        text2={["Métro","Aéroport","TGV","Autoroute"]}
        text3={["Arrêt Jolimont, métro A 1 minute à pied","Aéroport Toulouse-Blagnac 15 minutes en voiture","Gare Toulouse Matabiau 5 minutes en métro","A61 5 minutes en voiture"]}
        transports={["metro","aeroport1","ter","autoroute"]}
        />
        <Block3_3
        text1={["Adresse :","Promoteur :","Surface :","Parking :","Architecte :","Bureaux d'études :","Livraison prévisionnelle :","Labels et certifications :","Type de contrat :","Investisseur :","Stade :","A louer"]}
        text2={["53 rue Benjamin Baillaud, 31500 Toulouse","Cogedim","4 330 m² SDP","58 places en sous-sol","Devillers & Associés","OTEIS, Soconer, Bureau Veritas, Gambas Acoustique, Polyexpert Environnement","3e trimestre 2023","HQE® niveau excellent, BREEAM® niveau Very Good, RT 2012 -30%, E2C1","VEFA/BEFA","Tivoli Capital (quand a déjà été vendu / loué)","Travaux en cours",""]}
        text3={["Ce bien vous intéresse ?","Nous contacter"]}
        />

        <Block3_4
        text1={["Hill Side","Disposant d'une excellente accessibilité et visibilité, à proximité immédiate du nouveau quartier Guillemet, cet immeuble en R+5 bénéficie d'une flexibilité optimale grâce à la divisibilité des plateaux de bureaux en deux lots distincts sur chacun des niveaux. Hill Side a été conçu pour offrir des espaces de travail de haute qualité : hauteur libre des plateaux de bureaux de 2,70 m, avec l'ensemble des bureaux en premier jour et des ouvrant de confort par bureau.","Télécharger la brochure"]}
        />

        <Block3_5
        text1={["Plan de masse","Voir les plans"]}
        />
        <Footer
        text1={["UNE MARQUE ALTAREA","Vous avez besoin de plus d'informations ?","Nous contacter"]}
        text2={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text3={["Visitez le site"," Altarea"," et le site"," Cogedim pour les Particuliers","Copyright Altarea 2022 - Mentions Légales"]}
        />

        <Block4_1
        text0={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text1={["LE GROUPE ALTAREA","Fondé en 1994 par Alain Taravella, Altarea est aujourd'hui le premier développeur immobilier de France. Le Groupe a développé une plateforme de compétences immobilières et de développement unique au service de la transformation des villes, couvrant l'ensemble des classes d'actifs immobiliers (logement, commerce, bureau, logistique, hôtellerie, résidences services…). ","Cette spécificité lui permet de répondre efficacement et de manière globale aux enjeux de transformation des territoires et contribue à créer des villes agréables à vivre et ouvertes sur l'avenir."]}
        text4={"Découvrez nos projets immobiliers par région"}
        text5={["Auvergne Rhône-Alpes", "Bourgogne Franche-Comté","Bretagne", "Centre Val de Loire","Grand Est","Hauts-de-France","Normandie","Nouvelle Aquitaine","Occitanie","Pays de la Loire","Provence Alpes Côte d'Azur"]}
        />

        <Block4_2
        text1={["Activité","Porté par son modèle intégré unique en France, Altarea a pris une longueur d'avance sur le marché de la transformation urbaine, fondement de sa croissance future, pérenne et solide. Le Groupe propose une offre sur mesure qui favorise la réussite des projets urbains grâce à l'articulation de tous les savoir-faire de l'immobilier. Acteur multi-métier, son modèle intégré lui permet de mobiliser toutes les compétences nécessaires, quelle que soit la classe d'actif concernée."]}
        text2={["promoteur en logement","d'actifs de commerce sous gestion, dont","promoteur d'immobilier d'entreprise (sièges sociaux, bureaux, campus, hôtels, logistique)","développeur de grands projets urbains mixtes","3 Mds€ de réservations","2,4 Mds€ en quote-part","15 projets en développement"]}
        text3={["CLIENT","2","e","Cogedim élu Service Client de l'Année","47 000","au classement de la relation client HCG - Les Echos","pour la 5e année consécutive","emplois directs, indirects et induits soutenus en France"]}
        text4={["COLLABORATEURS","Top Employer 2022","1996","(certification internationale qui reconnaît l'excellence des pratiques RH)","collaborateurs"]}
        text5={["CLIMAT","Confirmation du statut Green Star 5*","-67,3%","au GRESB (agence de notation extra-financière) pour la 6e année consécutive","d'émissions de CO2 sur le patrimoine Commerce depuis 2010"]}
        />
        <Block4_3
        text1={[
        "Marque historique du Groupe",
        "L'acteur incontournable de l'immobilier neuf depuis 1963. Cogedim réalise de nombreux programmes immobiliers à l'identité architecturale affirmée et développe partout en France des opérations d'envergure, garantes de la pluralité de ses savoir-faire.",
        "Cogedim est particulièrement connu pour ses logements mais réalise également depuis plusieurs années des bureaux partout en France."]}
        text2={[
            "Les bureaux par Cogedim",
        "Cogedim a pour vocation d'accompagner les entreprises de toutes tailles dans leur stratégie d'implantation régionale dans un contexte où les modes de travail se transforment et les enjeux de développement durable sont prépondérants. Cogedim imagine ainsi le futur de l'immobilier de bureaux et s'adapte à ces changements pour en faire des lieux de rencontre plus attractifs et plus ouverts.",
        "L'immobilier d'entreprise en Régions regroupe une trentaine de collaborateurs répartis sur l'ensemble du territoire au sein des agences régionales de Cogedim. Ces implantations locales favorisent la connaissance des territoires, leurs spécificités et enjeux et permet ainsi de donner une réponse efficiente et adaptée aux mentalités et aux usages.",
        "EM Lyon, Lyon 7e"
        ]} />
        <Block4_4
        text1={["Évolution des usages","Développement Technologique","Délocalisation dans les métropoles régionales","Augmentation du nombre de télétravailleurs","Des enjeux environnementaux croissants","Évolution du management","La Tannerie, Lyon 7","White, Villeneuve d'Ascq","Uway, Toulouse"]}
        text2={["La Tannerie, Lyon 7","White, Villeneuve d'Ascq","Uway, Toulouse"]}
        />
        <Footer
        text1={["UNE MARQUE ALTAREA","Vous avez besoin de plus d'informations ?","Nous contacter"]}
        text2={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text3={["Visitez le site"," Altarea"," et le site"," Cogedim pour les Particuliers","Copyright Altarea 2022 - Mentions Légales"]}
        />
        <Block5_1
        text0={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text1={"NOS RÉFÉRENCES"} 
        text2={["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem."]}
        text3={[
        "       ",
        "Découvrez nos projets immobiliers phares"]}
        text4={"Découvrez nos projets immobiliers par région"}
        text5={["Auvergne Rhône-Alpes", "Bourgogne Franche-Comté","Bretagne", "Centre Val de Loire","Grand Est","Hauts-de-France","Normandie","Nouvelle Aquitaine","Occitanie","Pays de la Loire","Provence Alpes Côte d'Azur"]}
        />
        <Block5_2
        text1={["#Community, Mérignac (33)","Un campus d'inspiration biophilique pour Groupama","L'inspiration biophilique est une démarche qui consiste à prendre en considération le lien entre l'homme et la nature dans la conception même des bâtiments. C'est le fil rouge qui a guidé Cogedim pour développer #Community, un campus tertiaire d'envergure conçu par Hubert Godet Architectes.","Découvrir ce projet"]}
        text2={["Nom du projet","Sous-titre ici","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.","Découvrir ce projet"]}
        />
        <Block5_3
        text1={["Nom du projet","Sous-titre ici","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.","Découvrir ce projet"]}
        text2={["Nom du projet","Sous-titre ici","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.","Découvrir ce projet"]}
        />
        <Block5_4
        text1={["Nom du projet","Sous-titre ici","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.","Découvrir ce projet"]}
        />
        <Block5_5
        text1={["Nom du projet","Sous-titre ici","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.","Découvrir ce projet"]}
        text2={["Nom du projet","Sous-titre ici","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.","Découvrir ce projet"]}
        />
        <Footer
        text1={["UNE MARQUE ALTAREA","Vous avez besoin de plus d'informations ?","Nous contacter"]}
        text2={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text3={["Visitez le site"," Altarea"," et le site"," Cogedim pour les Particuliers","Copyright Altarea 2022 - Mentions Légales"]}
        />
        <Block6_1
        text0={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text1={["Nos références","#Community, Mérignac","L'inspiration biophilique est une démarche qui consiste à prendre en considération le lien entre l'homme et la nature dans la conception même des bâtiments. C'est le fil rouge qui a guidé Cogedim pour développer #Community, un campus tertiaire d'envergure conçu par Hubert Godet Architectes."]} 
        text3={[
        "       ",
        "Un campus d'inspiration biophilique pour Groupama "]}
        text4={"Découvrez nos projets immobiliers par région"}
        text5={["Auvergne Rhône-Alpes", "Bourgogne Franche-Comté","Bretagne", "Centre Val de Loire","Grand Est","Hauts-de-France","Normandie","Nouvelle Aquitaine","Occitanie","Pays de la Loire","Provence Alpes Côte d'Azur"]}
        />
        <Block6_2
        text1={"#Community, Mérignac"} 
        text2={["Adresse : ","Surface : ","Architecte : ","Livraison : ","Labels et certifications : ","Investisseur : ","Utilisateur : "]}
        text3={["Chemin du Magret, Parc Innolin, Mérignac (33700) ","environ 15 000 m² ","Hubert Godet Architectes ","avril 2022 ","NF HQE® « Excellent », BREEAM® International New Construction 2016 « Very Good », RT 2012 - 20 %, Label BIODIVERSITY, WiredScore Silver ","ATREAM","Groupama"]}
        text4={"Situé au cœur du parc d'activités Innolin, à Mérignac, en Gironde, s'inscrivant dans la philosophie et la trame verte de ce parc, le bâtiment de 15 000 m² regroupe depuis 2022 toutes les équipes bordelaises de Groupama, qui louera l'immeuble à hauteur de 80 %. Desservi par le futur tramway et la rocade bordelaise, il intègre de nombreux services, espaces collaboratifs et aménagements biophiliques contribuant au bien-être des futurs utilisateurs."}
        />
       <Block6_3
       text1={"Un immeuble exemplaire sur le plan environnemental"}
       text2={["Lumière naturelle et vue sur la nature","Toiture et façade végétalisées","Privilégier les solutions vertueuses pour l'environnement","Le Booster du Réemploi"]}
       text3={["C'est l'un des piliers de la démarche biophilique. L'immeuble a été construit en H afin que la totalité des espaces tertiaires offre une vue sur la nature.","L'intégralité des 2 500 m² de terrasse est végétalisée, une première en France. Elle intègre des sols de natures diversifiées, afin qu'une flore spontanée s'adaptant naturellement aux conditions créées.","Tout au long du projet, les solutions les plus durables ont été favorisées quand plusieurs possibilités se présentaient : parking silo plutôt que souterrain pour éviter le pompage des sols, clôture végétalisée plutôt que clôture en dur pour permettre aux animaux de petite taille de circuler, 100% du mobilier extérieur est fabriqué avec du bois local etc …","Avec #Community, Cogedim a expérimenté les principes du Booster du Réemploi, une démarche d'économie circulaire vertueuse associant de nombreux promoteurs et entreprises. Son objectif : favoriser le réemploi des déchets et gravats produits par le secteur de la construction afin de réduire l'impact environnemental de l'immobilier. À Mérignac, plus de 2 800 m2 de faux planchers de l'immeuble sont ainsi issus du réemploi de matériaux. Ils ont été conditionnés, transportés stockés, préparés, assurés et fournis par l'entreprise spécialisée Mobius Réemploi."]}
       />
       <Footer
        text1={["UNE MARQUE ALTAREA","Vous avez besoin de plus d'informations ?","Nous contacter"]}
        text2={["Le Groupe Altarea","Nos programmes","Nos références","Nous contacter"]}
        text3={["Visitez le site"," Altarea"," et le site"," Cogedim pour les Particuliers","Copyright Altarea 2022 - Mentions Légales"]}
        />
        <EmptyBlock />
    </>
}
//page1
interface Block1_1Props {
    text0: string[]
    text1: string
    text2: string[]
    text3: string[]
    text4: string
    text5: string[]
    propramme: string[]
    introduce: string
}
interface Block1_2Props {
    number1: number
    text1: string
    text2: string[]
    text3: string[]
}
interface Block1_3Props {
    text1: string[]
}
interface Block1_4Props {
    text1: string
}
interface Bottom_Props {
    text1: string[]
    text2: string[]
    text3: string[]
}
//page2
interface Block2_1Props{
    text0: string[]
    text1: string
    text2: string[]
    text3: string[]
    text4: string
    text5: string[]
    propramme: string[]
    introduce: string
}
interface Block2_2Props {
    number1: number
    text1: string
    text2: string[]
    text3: string[]
}
//page3
interface Block3_1Props{
    text0: string[]
    text1: string
    text2: string[]
    text3: string[]
    text4: string
    text5: string[]
    text6: string[]
    number1:number[]
}
interface Block3_2Props{
    text1: string
    text2: string[]
    text3: string[]
    transports: string[]

}
interface Block3_3Props{
    text1: string[]
    text2: string[]
    text3: string[]
}
interface Block3_4Props{
    text1: string[]
}
interface Block3_5Props{
    text1: string[]
}
//page4
interface Block4_1Props{
    text0: string[]
    text1: string[]
    text4: string
    text5: string[]
}
interface Block4_2Props{
    text1: string[]
    text2: string[]
    text3: string[]
    text4: string[]
    text5: string[]
}
interface Block4_3Props{
    text1: string[]
    text2: string[]
}
interface Block4_4Props{
    text1: string[]
    text2: string[]
}
//page5
interface Block5_1Props {
    text0: string[]
    text1: string
    text2: string[]
    text3: string[]
    text4: string
    text5: string[]
}
interface Block5_2Props{
    text1: string[]
    text2: string[]
}
interface Block5_3Props{
    text1: string[]
    text2: string[]
}
interface Block5_4Props{
    text1: string[]
}
interface Block5_5Props{
    text1: string[]
    text2: string[]
}
//page6
interface Block6_1Props{
    text0: string[]
    text1: string[]
    text3: string[]
    text4: string
    text5: string[]
}
interface Block6_2Props{
    text1: string
    text2: string[]
    text3: string[]
    text4: string
}
interface Block6_3Props{
    text1: string
    text2: string[]
    text3: string[]
}
const colorArr=["dark_red","purple","blue","light_blue","green","dark_yellow","medium_yellow","lemon","yellow","orange","red"]

//page1
//Only block1 can click the button to display the input field
const Block1_1 = ({text0, text1, text2, text3, text4, text5, propramme,introduce}: Block1_1Props) => {
    const block1={  'colorBar':false,
                    'textTitle':true,
                    'logo':false,
                    'roundButton':true,
                    "brands":false,
                    "infos":false,
                    "button":false,
                    "whiteText":true,
                    "person":false}
    let label_1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let label_2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let label_3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let label_4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    const move_down=()=>{
        scrollTo({
            top:800,left:0,behavior:"smooth"
        })
    }
    const [show, setShow] = useState(false)
    const show_box=()=>{
        setShow(!show)
    }
    const [show2, setShow2] = useState(false)
    const show_box2=()=>{
        setShow2(!show2)
    }
    const [showi,showInput] =useState(false)
    const show_input=()=>{
        showInput(!showi)
    }
    let [typeColors,changeType] =useState('dark_purple')
    const changeColor=(e:string)=>{
        changeType(typeColors=e)
        // console.log(typeColors)
    }
    let arr=[];
    for(let i=0;i<propramme.length;i++){
        let obj={ 'selections':propramme[i]}
        arr.push(obj)
    }
    return (
    <div className="block1_1">
        <div className="imageBox">
            <div className="Header">
                <div className="left">
                    <div className="icon-logo_purple">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                        <span className="path6"></span>
                        <span className="path7"></span>
                        <span className="path8"></span>
                        <span className="path9"></span>
                        <span className="path10"></span>
                    </div>
                    <div className="icon-burger_menu" onClick={show_box}></div>
                </div>
                <div className="title-text">{text0[0]}</div>
                <div className="title-text" onClick={show_box}>{text0[1]}</div>
                <div className="title-text">{text0[2]}</div>
                <div className="button" onClick={show_input}>
                    <div className="icon-mail"></div>
                    <div className="title-color-text">{text0[3]}</div>
                </div>
                <div className={(show ? 'mchooseBox' : 'hidden')}>
                    <div className="Part">
                        <div className="leftPart"></div>
                        <div className="rightPart">
                            <div className="titleText">{text0[0]}</div>
                            <div className="titleText " onClick={show_box2}>{text0[1]}
                            </div>
                                <div className={(show2 ? 'contentText' : 'hidden')}>
                                {colorArr.map((e, i) =>
                                    <div key={i} className={"text5 " + e}>
                                        {text5[i]}
                                    </div>
                                )}
                                </div>
                            <div className="titleText">{text0[2]}</div>
                            <div className="titleText">{text0[3]}</div>
                        </div>
                    </div>
                </div>
                <div className={(show ? 'chooseBox' : 'hidden')}>
                    <div className="chooseBoxinner">
                        <div className="leftPart">{text4}</div>
                        <div className="rightPart">
                            {colorArr.map((e, i) =>
                                <div key={i} className={"choice " + "hover_" + e} onClick={()=>changeColor(e)}>
                                    {text5[i]}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={(block1.colorBar ? ('colorBar ' + (typeColors)+"_bgc"): 'hidden') }>
                <div className="typebox">
                    <div className="type">test{" > "}</div>
                    <div className="type">test</div>
                </div>
            </div>
            <div className="text-box">
                <div className="text">
                    <div className={(block1.textTitle ? 'textTitle' : 'hidden')}>{text1}</div>
                    <div className={(block1.logo ? 'logo' : 'hidden')}>
                        <div className="icon-logo_hill_side">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                        </div>
                    </div>
                    <p className="content">{text2[0]}<strong>{text2[1]}</strong>{text2[2]}<strong>{text2[3]}</strong></p>          
                    <p className="content">{text2[4]}<strong>{text2[5]}</strong>{text2[6]}</p>
                </div>
                <div className={(block1.roundButton ? 'roundButton' : 'hidden')} onClick={move_down}>
                    <div className="icon-composant">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                </div>
                <div className={(block1.brands ? 'brands' : 'hidden')}>
                    <div className="icon-lower">
                        <Image src={label_1} width={100} height={24}></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_2} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_3} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_4} ></Image>
                    </div>
                </div>
                <div className={(block1.infos ? 'infos' : 'hidden') }>
                    <div className="line1">
                        <text className="title">title:</text>
                        <text className="content"> content</text>
                    </div>
                    <div className="line2">
                    <text className="title">title:</text>
                        <text className="content"> content</text>
                    </div>
                    <div className="line3">
                    <text className="title">title:</text>
                        <text className="content"> content</text>
                    </div>
                </div>
                <div className={(block1.button ? 'button':'hidden')}>
                    <div className="icon-mail"></div>
                    <div className="title-color-text">button</div>
                </div>
            </div>
            <div className={"arcBox " + (typeColors)+"_bgc07"}>
                <div className={(block1.person ? 'hidden' : 'mwhiteText')}>
                    {text3[1]}
                </div>
                <div className={(block1.person ? 'person' : 'hidden')}>
                        <Image src={label_1}></Image>
                </div>
            </div>
            <div className="white-text-box">
                <div className="white-text">
                    <text>{text3[0]}</text>
                    <text>{text3[1]}</text>
                </div>
            </div>
            <div className="white-ball-box">
                <div className="white-ball"></div>
            </div>
            <div className="white-box">
                <div className="color-ball"></div>
            </div>
        </div>
        <div className={(showi ? "inputBox":"hidden")}>
            <form action="submit" className="relativeBox">
                <div className="circular">
                    <div className="icon-logo_white">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                        <span className="path6"></span>
                        <span className="path7"></span>
                        <span className="path8"></span>
                        <span className="path9"></span>
                        <span className="path10"></span>
                    </div>
                </div>
                <div className="close" onClick={show_input}>
                   <div className="icon-x"></div>
                </div>
                <div className="title">En savoir plus</div>
                <div className="programme">
                    <div className="text">Programme</div>
                    <select className="select">
                        <option className="option none"></option>
                        {arr.map((e, i) =>
                            <option key={i} className="option">{e.selections}</option>
                            )
                        }
                    </select>
                </div>
                <div className="selection" placeholder="Programme">
                    <input type="radio" name="radio" value="Acheter" className="select" checked></input>Acheter
                    <input type="radio" name="radio" value="Louer" className="select" checked></input>Louer
                    <input type="radio" name="radio" value={"Demande d\'information"} className="select" checked></input>{'Demande d\'information'}
                </div>
                <div className="nompre">
                    <input type="text" name="firstname" placeholder="*Nom" className="middle nom"></input>
                    <input type="text" name="firstname" placeholder="*Prénom" className="middler pre"></input>
                </div>
                <input type="text" name="firstname" placeholder="*Email" className="large email"></input>
                <input type="text" name="firstname" placeholder="*Téléphone" className="large telephone"></input>
                <div className="code">
                    <input type="text" name="firstname" placeholder="*Code Postal" className="middle nom"></input>
                    <input type="text" name="firstname" placeholder="*Ville" className="middler pre"></input>
                </div>
                <textarea name="message" id="" cols={30} rows={10} placeholder="Message" className="message"></textarea>
                <button type="submit" className="envoyer" onClick={show_input}>
                    <div className="email">
                        <div className="icon-mail"></div>
                    </div>
                    <div>Envoyer</div>
                </button>
                <div className="bottomText" >{introduce}</div>
            </form> 
            {/* <div className="merci">
                <div className="circular">
                    <Image src={src} className="logo" width={100} height={100}></Image>
                </div>
                <button type="submit" className="fermer" onClick={show_input}>Fermer</button>
                <div className="bottomText">{introduce}</div>
            </div>  */}
        </div>
    </div>
    )
}
const Block1_2 = ({number1, text1, text2, text3}: Block1_2Props) => {
    const [open, setOpen] = useState(false)
    const change_map_size=()=>{
        setOpen(!open)
    }
    // scrollbox
    let arr=[]
    let arrm=[]
    let test=0
    while(test<10){
        for(let i=2;i<5;i++){
            let obj={ 'src':require(`../../public/styles/src/image_home_${i}@2x.png`).default,'icon':require(`../../public/styles/src/label_1@2x.png`).default}
            arr.push(obj)
        }
        test++
    }
    let test1=0;
    let temporary=0;
    let arr_scroll=[];
    let arr_scroll_box=[];
    while(test1<Math.ceil((arr.length)/9)){
        for(let i=0;i<8;i++){
            if(arr[temporary]){
                arr_scroll.push(arr[temporary])
                temporary++
            }
        }
        arr_scroll_box.push(arr_scroll)
        test1++
        arr_scroll=[];
    }
    // console.log("arr_scroll_box",arr_scroll_box)

    for(let i=2;i<5;i++){
        let obj={ 'src':require(`../../public/styles/src/image_home_${i}@2x.png`).default,'icon':require(`../../public/styles/src/label_1@2x.png`).default}
        arrm.push(obj)
    }
    let obj1={'src':require(`../../public/styles/src/image_home_2@2x.png`).default,'icon':require(`../../public/styles/src/label_1@2x.png`).default}
    arrm.push(obj1)
    let [chosen, setChosen] = useState(1)
    const changeChosen=(e:number)=>{
        setChosen(chosen=e+1)
    }
    const leftChosen=()=>{
        if(chosen!=1){
        setChosen(chosen=chosen-1)
        }
        // console.log(chosen)
    }
    const rightChosen=()=>{
        if(chosen!=arr_scroll_box.length){
        setChosen(chosen=chosen+1)
        }
        // console.log(chosen)

    }
    return (
        <div className="block1_2">
            <div className={"map" + (open ? ' open' : '') }>
                {/* <div className="mblock2-map">
                    <div className="title">
                        {number1} {text1}
                    </div>
                    <Map
                        // {...viewport}
                        initialViewState={{
                            longitude: 0.6,
                            latitude: 47.18,
                            zoom: 6.06
                        }}
                        style={{width: '100%', height: '400px'}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken="pk.eyJ1IjoicGl6enVwIiwiYSI6ImNsOTNtN3FzbzA1b3Mzdm9lZXpvcG94OXQifQ.PT2kirQB9_9_8By1AT41uQ"
                        // mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        // onViewportChange={ viewport=>{
                        //         setViewport(viewport);
                        //     }}
                    >
                        <Marker longitude={6} latitude={54} anchor="bottom" >
                            <div className="icon-gps_altarea">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                            </div>
                        </Marker>
                        <Marker longitude={8} latitude={53.8} anchor="bottom" >
                            <div className="number-ball" aria-label="aria-label">
                                13
                            </div>
                        </Marker>
                    </Map>
                </div> */}
                <div className={"block2-map" + (open ? ' open' : '') } id="block2-id">
                    <div className="title">
                        {number1} {text1}
                    </div>
                    <div className="mapBox">
                    <Map
                        // {...viewport}
                        initialViewState={{
                            longitude: 0.6,
                            latitude: 47.18,
                            zoom: 6.06
                        }}
                        style={{width: '100%', height: '100%'}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken="pk.eyJ1IjoicGl6enVwIiwiYSI6ImNsOTNtN3FzbzA1b3Mzdm9lZXpvcG94OXQifQ.PT2kirQB9_9_8By1AT41uQ"
                        // mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        // onViewportChange={ viewport=>{
                        //         setViewport(viewport);
                        //     }}
                    >
                        <Marker longitude={6} latitude={54} anchor="bottom" >
                            <div className="icon-gps_altarea">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                            </div>
                        </Marker>
                        <Marker longitude={8} latitude={53.8} anchor="bottom" >
                            <div className="number-ball" aria-label="aria-label">
                                13
                            </div>
                        </Marker>
                    </Map>
                    </div>
                    {/* <Script id="show-scroll" strategy="lazyOnload">
                        {`console.log("1")`}
                    </Script> */}
                </div>
            </div>
            <div className="scrollBox">
                <div className="scroll-boxm">
                    {arr_scroll_box[chosen-1].map((e,i) =>
                        <div key={i} className="show-box">
                            <div className="picture-title">
                                <Image key={i} src={ e.icon} alt="brand1" width={83} height={20}  className="picture"/>
                                <Image key={i} src={ e.icon} alt="brand1" width={83} height={20}  className="picture"/>
                            </div>
                            <div className="picture-box picture-box1">
                                <div className="bgc"> 
                                    <Image key={i} src={ e.src} alt="brand1" width={1200} height={900} className="picture"/>
                                    <div className="picture-text1">{text2[0]}</div>
                                    <div className="picture-text2">{text2[3]}</div>
                                </div>
                                <div className="white-bottom-box">
                                    <div className="Surface-flex">
                                        <div className="icon-calendrier"></div>
                                        <div className="Surface-name">
                                            <div className="Surface-Surface">{text3[0]}</div>
                                            <div className="Surface-info">{text3[1]}</div>
                                        </div>
                                    </div>
                                    <div className="Surface-flex">
                                        <div className="icon-surface"></div>
                                        <div className="Livraison-name">
                                            <div className="Surface-Surface">{text3[2]}</div>
                                            <div className="Surface-info">{text3[3]}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Decouvrir">
                                <div>Découvrir</div>  
                                <div className="icon-right"></div>
                            </div>
                        </div>
                    )}
                    <div className="voir">
                        Voir plus de projets
                    </div>
                </div>
                <div className="scroll-box-outside">
                    <div className="scroll-title">{number1} {text1}</div>
                    <div className={"scroll-box" + (open ? ' box-show' : '') }>
                        {arr_scroll_box[chosen-1].map((e, i) =>
                            <div key={i} className={"show-box" + (open ? ' show-box-width' : '')}>
                                <div className="picture-title">
                                    <Image key={i} src={ e.icon} alt="brand1" width={83} height={20}  className="picture"/>
                                    <Image key={i} src={ e.icon} alt="brand1" width={83} height={20}  className="picture"/>
                                </div>
                                <div className="picture-box picture-box1">
                                    <div className="bgc"> 
                                        <Image key={i} src={ e.src} alt="brand1" width={1200} height={900} className="picture"/>
                                        <div className="picture-text1">{text2[0]}</div>
                                        <div className="picture-text2">{text2[3]}</div>
                                    </div>
                                    <div className="white-bottom-box">
                                        <div className="Surface-flex">
                                            <div className="icon-surface"></div>
                                            <div className="Surface-name">
                                                <div className="Surface-Surface">{text3[0]}</div>
                                                <div className="Surface-info">{text3[1]}</div>
                                            </div>
                                        </div>
                                        <div className="Surface-flex">
                                            <div className="icon-calendrier"></div>
                                            <div className="Livraison-name">
                                                <div className="Surface-Surface">{text3[2]}</div>
                                                <div className="Surface-info">{text3[3]}</div>
                                            </div>
                                        </div>
                                        <div className="Decouvrir">
                                        <div>Découvrir</div> <div className="icon-right"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={"border-bottom" + (open ? ' border-bottom-click' : '') }>
                    </div>
                    <div className="border-selection">
                        <div className="icon-left cursorPointer" onClick={leftChosen}></div>
                        {arr_scroll_box.map((e,i)=>
                            <div key={i} className={"selection cursorPointer" + ((i+1)==chosen ? ' selected' : '')} onClick={()=>changeChosen(i)}>
                                {i + 1}
                            </div>
                        )}
                        {/* <div className="selection selected">1</div>
                        <div className="selection">2</div>
                        <div className="selection">3</div>
                        <div className="selection">4</div>
                        <div className="selection">5</div>
                        <div className="selection">6</div> */}
                        <div className="icon-right cursorPointer" onClick={rightChosen}></div>
                    </div>
                    <div className={"click-move" + (open ? ' hidden' : '') } style={{}} onClick={change_map_size}>
                        <div className="icon-left"></div>
                    </div>
                    <div className={"click-move" + (open ? '' : ' hidden') } style={{}} onClick={change_map_size}>
                        <div className="icon-right"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Block1_3 = ({text1}: Block1_3Props) => {
    // let src=require(`../../public/styles/src/image_home_5@2x.png`).default
    return (
    <div className="block1_3">
        <div className="left-box">
            <div className="text-box">
                <div className="text-box-title">{text1[0]}</div>
                <div className="text-box-text">
                    <text className="text1">{text1[1]}</text>
                    <text className="text2">{text1[2]}</text>
                </div>
                <div className="button cursorPointer">
                    <div className="icon-mail"></div>
                    <div className="title-color-text">{text1[3]}</div>
                </div>
            </div>
        </div>
        <div className="right-box">
            <div className="white-border">
                <div className="text">{text1[4]}</div>
            </div>
            {/* <Image src={src} width={960} height={500}></Image> */}
        </div>
    </div>
    )
}
const Block1_4 = ({text1}: Block1_4Props)=>{
    let arr=[]
    //brandContainer
    let n=0;
    while(n<3){
        for(let i=1;i<25;i++){
            let obj={ 'src':require(`../../public/styles/src/brand/logo_client_${i}@2x.png`).default}
            // let obj={ 'src':`../../public/styles/src/brand/logo_client_${i}@2x.png`}
            arr.push(obj)
        }
        n++
    }
    // scrollbox
    let test1=0;
    let temporary=0;
    let arr_scroll=[];
    let arr_scroll_box=[];
    while(test1<Math.ceil((arr.length)/24)){
        for(let i=0;i<23;i++){
            // console.log(arr[temporary])
            if(arr[temporary]){
                arr_scroll.push(arr[temporary])
                temporary++
            }
        }
        arr_scroll_box.push(arr_scroll)
        test1++
        arr_scroll=[];
    }
    // const list = [{src: "!"}]
    // let src1=require("../../public/styles/src/brand/logo_client_1@2x.png").default;
    let [chosen, setChosen] = useState(1)
    const changeChosen=(e:number)=>{
        setChosen(chosen=e+1)
    }
    const leftChosen=()=>{
        if(chosen!=1){
        setChosen(chosen=chosen-1)
        }
        // console.log(chosen)
    }
    const rightChosen=()=>{
        if(chosen!=arr_scroll_box.length){
        setChosen(chosen=chosen+1)
        }
        // console.log(chosen)

    }
    return (
        <div className="block1_4">
            <div className="block4Title">{text1}</div>
            <div className="brandContainer">
                {arr_scroll_box[chosen-1].map((e, i) =>
                    // <div key={i}>{e.src}</div>
                    <div key={i} className="brandBox">
                        <Image key={i} src={ e.src} alt="brand1" className="brand"/>
                    </div>
                )}
            </div>
            <div className="borderSelection">
                <div className="icon-left cursorPointer" onClick={leftChosen}></div>
                {arr_scroll_box.map((e,i)=>
                    <div key={i} className={"selection cursorPointer" + ((i+1)==chosen ? ' selected' : '')} onClick={()=>changeChosen(i)}>
                        {i + 1}
                    </div>
                )}
                <div className="icon-right cursorPointer" onClick={rightChosen}></div>
                {/* <div className="icon-left"></div>
                <div className="selection selected">1</div>
                <div className="selection">2</div>
                <div className="selection">3</div>
                <div className="icon-right"></div> */}
            </div>
        </div> 
    )
}
const Footer=({text1,text2,text3}: Bottom_Props)=>{
    return(
        <div className="Footer">
            <div className="block5Top">
                <div className="icon-logo_simple"></div>
                <text className="topName">{text1[0]}</text>
            </div>
            <div className="block5Middle">
                <div className="question">{text1[1]}</div>
                <div className="button">
                    <div className="icon-mail"></div>
                    <div className="title-color-text">{text1[2]}</div>
                </div>
            </div>
            <div className="block5Bottom">
                <div className="options">
                    <div className="brandm">
                        <div className="icon-logo_purple">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                            <span className="path8"></span>
                            <span className="path9"></span>
                            <span className="path10"></span>
                        </div>
                    </div>
                    <div className="option">{text2[0]}</div>
                    <div className="option">{text2[1]}</div>
                    <div className="brand">
                        <div className="icon-logo_purple">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                            <span className="path8"></span>
                            <span className="path9"></span>
                            <span className="path10"></span>
                        </div>
                    </div>
                    <div className="option">{text2[2]}</div>
                    <div className="option">{text2[3]}</div>
                </div>
                <div className="declaration">
                    <div className="first-line">
                        <text className="text-normal">{text3[0]}</text>
                        <text className="text-bold">{text3[1]}</text>
                        <text className="text-normal">{text3[2]}</text>
                        <text className="text-bold">{text3[3]}</text>
                    </div>
                    <div className="second-line">{text3[4]}</div>
                </div>
            </div>

        </div>
    )
}
//page2
const Block2_1 = ({text0, text1, text2, text3, text4, text5, propramme,introduce}: Block2_1Props) => {
    // let backgroundImage=require(`../../public/styles/src/image_home_1@2x.png`).default
    const block1={  'colorBar':false,
        'textTitle':true,
        'logo':false,
        'roundButton':true,
        "brands":false,
        "infos":false,
        "button":false,
        "whiteText":true,
        "person":false}
    const colorArr=["dark_red","purple","blue","light_blue","green","dark_yellow","medium_yellow","lemon","yellow","orange","red"]
    let label_1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let label_2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let label_3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let label_4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    const move_down=()=>{
        scrollTo({
            top:4800,left:0,behavior:"smooth"
        })
    }
    const [show, setShow] = useState(false)
    const show_box=()=>{
        setShow(!show)
    }
    const [show2, setShow2] = useState(false)
    const show_box2=()=>{
        setShow2(!show2)
    }
    const [showi,showInput] =useState(false)
    const show_input=()=>{
        showInput(!showi)
    }
    let [typeColors,changeType] =useState('yellow')
    const changeColor=(e:string)=>{
        changeType(typeColors=e)
        // console.log(typeColors)
    }
    let arr=[];
    for(let i=0;i<propramme.length;i++){
        let obj={ 'selections':propramme[i]}
        arr.push(obj)
    }
    return (
    <div className="block2_1">
        <div className="imageBox">
            <div className="Header">
                <div className="left">
                    <div className="icon-logo_purple">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                        <span className="path6"></span>
                        <span className="path7"></span>
                        <span className="path8"></span>
                        <span className="path9"></span>
                        <span className="path10"></span>
                    </div>
                    <div className="icon-burger_menu" onClick={show_box}></div>
                </div>
                <div className="title-text">{text0[0]}</div>
                <div className="title-text" onClick={show_box}>{text0[1]}</div>
                <div className="title-text">{text0[2]}</div>
                <div className="button" onClick={show_input}>
                    <div className="icon-mail"></div>
                    <div className="title-color-text">{text0[3]}</div>
                </div>
                <div className={(show ? 'mchooseBox' : 'hidden')}>
                    <div className="Part">
                        <div className="leftPart"></div>
                        <div className="rightPart">
                        <div className="titleText">{text0[0]}</div>
                        <div className="titleText " onClick={show_box2}>{text0[1]}
                        </div>
                            <div className={(show2 ? 'contentText' : 'hidden')}>
                            {colorArr.map((e, i) =>
                                <div key={i} className={e} onClick={()=>changeColor(e)}>
                                    {text5[i]}
                                </div>
                            )}
                            </div>
                        <div className="titleText">{text0[2]}</div>
                        <div className="titleText">{text0[3]}</div>
                        </div>
                    </div>
                </div>
                <div className={(show ? 'chooseBox' : 'hidden')}>
                    <div className="chooseBoxinner">
                        <div className="leftPart">{text4}</div>
                        <div className="rightPart">
                            {colorArr.map((e, i) =>
                                <div key={i} className={"choice " + "hover_" + e} onClick={()=>changeColor(e)}>
                                    {text5[i]}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={(block1.colorBar ? ('colorBar ' + (typeColors)+"_bgc"): 'hidden') }>
                <div className="typebox">
                    <div className="type">test{" > "}</div>
                    <div className="type">test</div>
                </div>
            </div>
            <div className="text-box">
                <div className="text">
                    <div className={(block1.textTitle ? ('textTitle ' + (typeColors)): 'hidden')}>{text1}</div>
                    <div className={(block1.logo ? 'logo' : 'hidden')}>
                        <div className="icon-logo_hill_side">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                        </div>
                    </div>
                    <p className="content">{text2[0] }</p>          
                    <p className="content">{text2[1] }</p>
                </div>
                <div className={(block1.roundButton ? 'roundButton' : 'hidden')} onClick={move_down}>
                    <div className="icon-composant">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                </div>
                <div className={(block1.brands ? 'brands' : 'hidden')}>
                    <div className="icon-lower">
                        <Image src={label_1} width={100} height={24}></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_2} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_3} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_4} ></Image>
                    </div>
                </div>
                <div className={(block1.infos ? 'infos' : 'hidden') }>
                    <div className="line1">
                        <text className="title">title:</text>
                        <text className="content"> content</text>
                    </div>
                    <div className="line2">
                    <text className="title">title:</text>
                        <text className="content"> content</text>
                    </div>
                    <div className="line3">
                    <text className="title">title:</text>
                        <text className="content"> content</text>
                    </div>
                </div>
                <div className={(block1.button ? 'button':'hidden')}>
                    <div className="icon-mail"></div>
                    <div className="title-color-text">button</div>
                </div>
            </div>
            <div className={"arcBox " + (typeColors)+"_bgc07"}>
                <div className={(block1.person ? 'hidden' : 'mwhiteText')}>
                    {text3[1]}
                </div>
                <div className={(block1.person ? 'person' : 'hidden')}>
                        <Image src={label_1}></Image>
                </div>
            </div>
            <div className="white-text-box">
                <div className="white-text">
                    <text>{text3[0]}</text>
                    <text>{text3[1]}</text>
                </div>
            </div>
            <div className="white-ball-box">
                <div className="white-ball"></div>
            </div>
            <div className={"white-box " + (typeColors)+"_bgc03"}>
                <div className={"color-ball " + (typeColors)+"_bgc07"}></div>
            </div>
        </div>
    </div>
    )
}
const Block2_2 = ({number1, text1, text2, text3}: Block2_2Props) => {
    // scrollbox
    let arr=[]
    let arrm=[]
    let test=0
    while(test<10){
        for(let i=2;i<5;i++){
            let obj={ 'src':require(`../../public/styles/src/image_home_${i}@2x.png`).default,'icon':require(`../../public/styles/src/label_1@2x.png`).default}
            arr.push(obj)
        }
        test++
    }
    let test1=0;
    let temporary=0;
    let arr_scroll=[];
    let arr_scroll_box=[];
    while(test1<Math.ceil((arr.length)/4)){
        for(let i=0;i<4;i++){
            if(arr[temporary]){
                arr_scroll.push(arr[temporary])
                temporary++
            }
        }
        arr_scroll_box.push(arr_scroll)
        test1++
        arr_scroll=[];
    }
    // console.log("arr_scroll_box",arr_scroll_box)

    for(let i=2;i<5;i++){
        let obj={ 'src':require(`../../public/styles/src/image_home_${i}@2x.png`).default,'icon':require(`../../public/styles/src/label_1@2x.png`).default}
        arrm.push(obj)
    }
    let obj1={'src':require(`../../public/styles/src/image_home_2@2x.png`).default,'icon':require(`../../public/styles/src/label_1@2x.png`).default}
    arrm.push(obj1)
    let [chosen, setChosen] = useState(1)
    const changeChosen=(e:number)=>{
        setChosen(chosen=e+1)
    }
    const leftChosen=()=>{
        if(chosen!=1){
        setChosen(chosen=chosen-1)
        }
        // console.log(chosen)
    }
    const rightChosen=()=>{
        if(chosen!=arr_scroll_box.length){
        setChosen(chosen=chosen+1)
        }
        // console.log(chosen)
    }
    // let [chosenArr, plus] = useState([{}])
    // chosenArr.push(arr[0])
    // for(let a=0;a<4;a++){
    //     chosenArr.push(arr[a])
    // }
    // let index=4
    // const moreChosen=()=>{
    //     plus(chosenArr.push(arr[index]))
    // }
    return (
        <div className="block2_2">
            <div className="scrollBox">
                <div className="scroll-boxm">
                    {arr_scroll_box[chosen-1].map((e, i) =>
                        <div key={i} className="show-box">
                            <div className="picture-title">
                                <Image key={i} src={ e.icon} alt="brand1" width={83} height={20}  className="picture"/>
                                <Image key={i} src={ e.icon} alt="brand1" width={83} height={20}  className="picture"/>
                            </div>
                            <div className="picture-box picture-box1">
                                <div className="bgc"> 
                                    <Image key={i} src={ e.src} alt="brand1" width={1200} height={900} className="picture"/>
                                    <div className="picture-text1">{text2[0]}</div>
                                    <div className="picture-text2">{text2[3]}</div>
                                </div>
                                <div className="white-bottom-box">
                                    <div className="Surface-flex">
                                        <div className="icon-calendrier"></div>
                                        <div className="Surface-name">
                                            <div className="Surface-Surface">{text3[0]}</div>
                                            <div className="Surface-info">{text3[1]}</div>
                                        </div>
                                    </div>
                                    <div className="Surface-flex">
                                        <div className="icon-surface"></div>
                                        <div className="Livraison-name">
                                            <div className="Surface-Surface">{text3[2]}</div>
                                            <div className="Surface-info">{text3[3]}</div>
                                        </div>
                                    </div>
                                    <div className="Decouvrirm">
                                        <div>Découvrir</div>  
                                        <div className="icon-right"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="Decouvrir">
                                <div>Découvrir</div>  
                                <div className="icon-right"></div>
                            </div>
                        </div>
                    )}
                    {/* onClick={moreChosen} */}
                    <div className="voir" >
                        Voir plus de projets
                    </div>
                </div>
                <div className="border-selection">
                    <div className="icon-left cursorPointer" onClick={leftChosen}></div>
                    {arr_scroll_box.map((e,i)=>
                        <div key={i} className={"selection cursorPointer" + ((i+1)==chosen ? ' selected' : '')} onClick={()=>changeChosen(i)}>
                            {i + 1}
                        </div>
                    )}
                    <div className="icon-right cursorPointer" onClick={rightChosen}></div>
                </div>
                {/* {arrm.map((e, i) =>
                    <div  key={i} className="show-box">
                        <div className="picture-title">
                            <Image key={i} src={ e.icon} alt="brand1" width={83} height={20}  className="picture"/>
                        </div>
                        <div className="picture-box picture-box1">
                            <div className="bgc">
                                <Image key={i} src={ e.src} alt="brand1" width={1200} height={900} className="picture"/>
                                <div className="picture-text1">{text2[0]}</div>
                                <div className="picture-text2">{text2[3]}</div>
                            </div>
                            <div className="white-bottom-box">
                                <div className="Surface-flex">
                                    <div className="icon-calendrier"></div>
                                    <div className="Surface-name">
                                        <div className="Surface-Surface">{text3[0]}</div>
                                        <div className="Surface-info">{text3[1]}</div>
                                    </div>
                                </div>
                                <div className="Surface-flex">
                                    <div className="icon-surface"></div>
                                    <div className="Livraison-name">
                                        <div className="Surface-Surface">{text3[2]}</div>
                                        <div className="Surface-info">{text3[3]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Decouvrir">
                            <div>Découvrir</div>  
                            <div className="icon-right"></div>
                        </div>
                    </div>
                )}
                <div className="voir">
                    Voir plus de projets
                </div>
                <div className={"scroll-box" + (open ? ' box-show' : '') }>
                    {arr.map((e, i) =>
                        <div key={i} className="show-box">
                            <div className="picture-title">title</div>
                            <div className="picture-box picture-box1">
                                <div className="bgc"> 
                                    <Image key={i} src={ e.src} alt="brand1" width={1200} height={900} className="picture"/>
                                    <div className="picture-text1">{text2[0]}</div>
                                    <div className="picture-text2">{text2[3]}</div>
                                </div>
                                <div className="white-bottom-box">
                                    <div className="Surface-flex">
                                        <div className="surface"></div>
                                        <div className="Surface-name">
                                            <div className="Surface-Surface">{text3[0]}</div>
                                            <div className="Surface-info">{text3[1]}</div>
                                        </div>
                                    </div>
                                    <div className="Surface-flex">
                                        <div className="calendrier"></div>
                                        <div className="Livraison-name">
                                            <div className="Surface-Surface">{text3[2]}</div>
                                            <div className="Surface-info">{text3[3]}</div>
                                        </div>
                                    </div>
                                    <div className="Decouvrir">
                                    Découvrir <div className="icon-right"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={"border-bottom" + (open ? ' border-bottom-click' : '') }>
                </div>
                <div className="border-selection">
                    <div className="icon-left"></div>
                    <div className="selection selected">1</div>
                    <div className="selection">2</div>
                    <div className="selection">3</div>
                    <div className="selection">4</div>
                    <div className="selection">5</div>
                    <div className="selection">6</div>
                    <div className="icon-right"></div>
                </div> */}
            </div>
        </div>
    )
}
//page3
const Block3_1=({text0, text1, text2, text3, text4, text5, text6, number1}:Block3_1Props)=>{
    const block1={  'colorBar':true,
        'textTitle':false,
        'logo':true,
        'roundButton':false,
        "brands":true,
        "infos":true,
        "button":true,
        "whiteText":false,
        "person":false}
    let label_1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let label_2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let label_3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let label_4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    const [show, setShow] = useState(false)
    const show_box=()=>{
        setShow(!show)
    }
    const [show2, setShow2] = useState(false)
    const show_box2=()=>{
        setShow2(!show2)
    }
    const [showi,showInput] =useState(false)
    const show_input=()=>{
        showInput(!showi)
    }
    let [typeColors,changeType] =useState('yellow')
    const changeColor=(e:string)=>{
        changeType(typeColors=e)
        // console.log(typeColors)
    }
    return (
    <div className="block3_1">
        <div className="imageBox">
            <div className="Header">
                <div className="left">
                    <div className="icon-logo_purple">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                        <span className="path6"></span>
                        <span className="path7"></span>
                        <span className="path8"></span>
                        <span className="path9"></span>
                        <span className="path10"></span>
                    </div>
                    <div className="icon-burger_menu" onClick={show_box}></div>
                </div>
                <div className="title-text">{text0[0]}</div>
                <div className="title-text" onClick={show_box}>{text0[1]}</div>
                <div className="title-text">{text0[2]}</div>
                <div className="button" onClick={show_input}>
                    <div className="icon-mail"></div>
                    <div className="title-color-text">{text0[3]}</div>
                </div>
                <div className={(show ? 'mchooseBox' : 'hidden')}>
                    <div className="Part">
                        <div className="leftPart"></div>
                        <div className="rightPart">
                        <div className="titleText">{text0[0]}</div>
                        <div className="titleText " onClick={show_box2}>{text0[1]}
                        </div>
                            <div className={(show2 ? 'contentText' : 'hidden')}>
                                <div className="text5 dark_red"      onClick={(e)=>changeColor("dark_red")}>{text5[0]}</div>
                                <div className="text5 purple"        onClick={(e)=>changeColor("purple")}>{text5[1]}</div>
                                <div className="text5 blue"          onClick={(e)=>changeColor("blue")}>{text5[2]}</div>
                                <div className="text5 light_blue"    onClick={(e)=>changeColor("light_blue")}>{text5[3]}</div>
                                <div className="text5 green"         onClick={(e)=>changeColor("green")}>{text5[4]}</div>
                                <div className="text5 dark_yellow"   onClick={(e)=>changeColor("dark_yellow")}>{text5[5]}</div>
                                <div className="text5 medium_yellow" onClick={(e)=>changeColor("medium_yellow")}>{text5[6]}</div>
                                <div className="text5 lemon"         onClick={(e)=>changeColor("lemon")}>{text5[7]}</div>
                                <div className="text5 yellow"        onClick={(e)=>changeColor("yellow")}>{text5[8]}</div>
                                <div className="text5 orange"        onClick={(e)=>changeColor("orange")}>{text5[9]}</div>
                                <div className="text5 red"           onClick={(e)=>changeColor("red")}>{text5[10]}</div>
                            </div>
                        <div className="titleText">{text0[2]}</div>
                        <div className="titleText">{text0[3]}</div>
                        </div>
                    </div>
                </div>
                <div className={(show ? 'chooseBox' : 'hidden')}>
                    <div className="chooseBoxinner">
                        <div className="leftPart">{text4}</div>
                        <div className="rightPart">
                            {colorArr.map((e, i) =>
                                <div key={i} className={"choice " + "hover_" + e} onClick={()=>changeColor(e)}>
                                    {text5[i]}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={(block1.colorBar ? ('colorBar ' + (typeColors)+"_bgc"): 'hidden') }>
                <div className="typebox">
                    <div className="type">test{" > "}</div>
                    <div className="type">test</div>
                </div>
            </div>
            <div className="text-box">
                <div className="text">
                    <div className={(block1.textTitle ? ('textTitle ' + (typeColors)): 'hidden')}>{text1}</div>
                    <div className={(block1.logo ? 'logo' : 'hidden')}>
                        <div className="icon-logo_hill_side">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                        </div>
                    </div>
                    <p className="content">{text1 }</p>          
                </div>
                <div className={(block1.roundButton ? 'roundButton' : 'hidden')}>
                    <div className="icon-composant">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                </div>
                <div className={(block1.brands ? 'brands' : 'hidden')}>
                    <div className="icon-lower">
                        <Image src={label_1} width={100} height={24}></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_2} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_3} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_4} ></Image>
                    </div>
                </div>
                <div className={(block1.infos ? 'infos' : 'hidden') }>
                        <div className="line1">
                            <text className="title">{text2[0]}:</text>
                            <text className="content"> {number1[0]}</text>
                            <text className="content"> m<sup>2</sup></text>
                            <text className="content"> {text2[3]}</text>
                        </div>
                        <div className="line2">
                            <text className="title">{text2[1]}:</text>
                            <text className="content"> {number1[1]}<sup>e</sup></text>
                            <text className="content"> {text2[4]}</text>
                            <text className="content"> {number1[2]}</text>
                        </div>
                        <div className="line3">
                            <text className="title">{text2[2]}:</text>
                            <text className="content"> {text3[0]}</text>
                        </div>
                </div>
                <div className={(block1.button ? 'button':'hidden')} onClick={show_input}>
                        <div className="icon-mail"></div>
                        <div className="title-color-text">{text0[3]}</div>
                </div>
            </div>
            <div className={"arcBox " + (typeColors)+"_bgc03"}>
                <div className={(block1.person ? 'hidden' : 'mwhiteText')}>
                    {text3[1]}
                </div>
                <div className={(block1.person ? 'person' : 'hidden')}>
                    <Image src={label_1}></Image>
                </div>
            </div>
            <div className="white-text-box">
                <div className="white-text">
                </div>
            </div>
            <div className="white-ball-box">
                <div className="white-ball"></div>
            </div>
            <div className={"white-box " + (typeColors)+"_bgc03"} >
                <div className={"color-ball " + (typeColors)+"_bgc07"}></div>
            </div>
        </div>
    </div>
    )
}
const Block3_2=({text1,text2,text3,transports}:Block3_2Props)=>{
    let arr_name=[0,1,2,3]
    let arr=[]
    for(let i of arr_name){
        // console.log(i,`../../public/styles/src/image_home_${i}@2x.png`)
        // let obj={ 'src':require(`../../public/styles/src/page2/icone_transport_${i}@2x.png`).default,"id":parseInt(i)-1}
        let obj={"name":transports[i],"id":i}
        arr.push(obj)
    }
    // let [leftposition,changePosition] =useState('calc(40% - 320px);')
    // let move=320;
    // const moveleft=()=>{
    //     move=move+20
    //     changePosition(leftposition='calc(40% - ' + move + 'px);')
    // }
    // const moveright=()=>{
    //     move=move-20
    //     changePosition(leftposition='calc(40% - ' + move + 'px);')
    // }
    return(
    <div className="block3_2">
        <div className="title">{text1}</div>
        <div className="map">
            {/*  style={{left: leftposition}} */}
            <div className="mapPicture">
                <Image src={plan_situation} aria-label="aria-label" width={2400} height={1000} className="mapimg"></Image>
            </div>
            <div className="icon-left_yellow_arrow">
                <span className="path1"></span>
                <span className="path2"></span>
            </div>
            <div className="icon-right_yellow_arrow">
                <span className="path1"></span>
                <span className="path2"></span>
            </div>
            <div className="right_arrow"></div>
        </div>
        <div className="transparents">
            {arr.map((e,i)=>
                <div key={i} className="transport-boxs">
                    <div className={"transport-box yellow icon-"+e.name}></div>
                    {/* {(e.name=="autoroute"?<div className="transport-box yellow icon-autoroute">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                            </div>  :"")} */}
                    {/* <Image key={i} src={ e.src} alt="brand1" className="transport" /> */}
                    <div className="transport-name yellow">{text2[e.id]}</div>
                    <div className="transport-journey">{text3[e.id]}</div>
                </div>
            )}
            <div className="vehicle1"></div>
        </div>
    </div>
    )
}
const Block3_3=({text1,text2,text3}:Block3_3Props)=>{ 
    let arr=[]
    for(let a=0;a<text1.length;a++){
        let obj={ 'title':text1[a] ,"content":text2[a]}
        arr.push(obj)
    }
    const [show, setShow] = useState(false)
    const show_box=()=>{
        setShow(!show)
    }
    let imageArr=[];
    imageArr.push({'src':require(`../../public/styles/src/page2/image_programme_2@2x.png`).default})
    imageArr.push({'src':require(`../../public/styles/src/page2/image_programme_1@2x.png`).default})
    imageArr.push({'src':require(`../../public/styles/src/page2/image_programme_3@2x.png`).default})
    let [index,change] = useState(0)
    const changeImage=(e:number)=>{
        change(index=e)
    }
    const leftChosen=()=>{
        // console.log(index)
        if(index!=0){
            change(index=index-1)
        }
    }
    const rightChosen=()=>{
        // console.log(index)

        if(index!=(imageArr.length-1)){
            change(index=index+1)
        }
    }
    return(
        <div className="block3_3">
            <div className="inner_box">
                <div className="leftBox">
                    <div className="image" onClick={show_box}>
                        <Image src={imageArr[index].src}  alt="image_programme_2" className="picture"/>
                        <div className="icon-share">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                        </div>
                    </div>
                    <div className="changeButton">
                        {imageArr.map((e, i) =>
                            <div key={i} className={"yellowBall cursorPointer" + ((i)==index ? ' selected' : '')} onClick={()=>changeImage(i)}>
                            </div>
                        )}
                    </div>
                    <div className="icon-left_yellow_arrow" onClick={leftChosen}>
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                    <div className="icon-right_yellow_arrow" onClick={rightChosen}>
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                </div>
                <div className="rightBox">
                    <div className="logo">
                        {/* <Logo_hill_png aria-label="aria-label">
                        </Logo_hill_png> */}
                        <Image src={Logo_hill_png} aria-label="aria-label" className="logoHill"></Image>
                    </div>
                    {arr.map((e,i)=>
                        <div key={i} className="messages">
                            <text className="title">{e.title} </text>
                            <text className="content">{e.content}</text>
                        </div>
                    )}
                    <div className="bottom">
                        <div className="question">{text3[0]}</div>
                        <div className="button">
                            <div className="icon-mail"></div>                            
                            <div className="title-color-text">{text3[1]}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={(show ? 'showBox' : 'hidden')}>
                    <div className="image" >
                        <Image src={imageArr[index].src} alt="image_programme_2" className="image"/>
                        <div className="icon-x" onClick={show_box}></div>
                        <div className="icon-left" onClick={leftChosen}></div>
                        <div className="icon-right" onClick={rightChosen}></div>
                    </div>
            </div>
        </div>
    )
}
const Block3_4=({text1}:Block3_4Props)=>{
    let src=require(`../../public/styles/src/page2/image_programme_3@2x.png`).default
    return(
        <div className="block3_4">
            <div className="left">
                <div className="title yellow">{text1[0]}</div>
                <div className="content">{text1[1]}</div>
                <div className="button">{text1[2]}</div>
            </div>
            <div className="right">
                <Image  src={src} alt="brand1" width={960} height={500} className="brand"/>
            </div>
        </div>
    )
}
const Block3_5=({text1}:Block3_5Props)=>{
    let src=require(`../../public/styles/src/page2/pland_de_masse@2x.png`).default
    return(
        <div className="block3_5">
            <div className="title yellow">{text1[0]}</div>
            <div className="picture">
                <Image  src={src} alt="brand1" className="brand"/>
            </div>
            <div className="button">{text1[1]}</div>
        </div>
    )  
}
//page4
const Block4_1=({text0,text1,text4,text5}:Block4_1Props)=>{
    const block1={  'colorBar':false,
            'textTitle':true,
            'logo':false,
            'roundButton':false,
            "brands":false,
            "infos":false,
            "button":false,
            "whiteText":false,
            "person":true}
    let label_1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let label_2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let label_3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let label_4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    const [show, setShow] = useState(false)
    const show_box=()=>{
        setShow(!show)
    }
    const [show2, setShow2] = useState(false)
    const show_box2=()=>{
        setShow2(!show2)
    }
    const [showi,showInput] =useState(false)
    const show_input=()=>{
        showInput(!showi)
    }
    let [typeColors,changeType] =useState('dark_purple')
    const changeColor=(e:string)=>{
        changeType(typeColors=e)
        // console.log(typeColors)
    }
    let src=require(`../../public/styles/src/page3/photo_alain_taravella@2x.png`).default
    return (
    <div className="block4_1">
        <div className="imageBox">
            <div className="Header">
                <div className="left">
                    <div className="icon-logo_purple">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                        <span className="path6"></span>
                        <span className="path7"></span>
                        <span className="path8"></span>
                        <span className="path9"></span>
                        <span className="path10"></span>
                    </div>
                    <div className="icon-burger_menu" onClick={show_box}></div>
                </div>
                <div className="title-text">{text0[0]}</div>
                <div className="title-text" onClick={show_box}>{text0[1]}</div>
                <div className="title-text">{text0[2]}</div>
                <div className="button" onClick={show_input}>
                    <div className="icon-mail"></div>
                    <div className="title-color-text">{text0[3]}</div>
                </div>
                <div className={(show ? 'mchooseBox' : 'hidden')}>
                    <div className="Part">
                        <div className="leftPart"></div>
                        <div className="rightPart">
                        <div className="titleText">{text0[0]}</div>
                        <div className="titleText " onClick={show_box2}>{text0[1]}
                        </div>
                            <div className={(show2 ? 'contentText' : 'hidden')}>
                                <div className="text5 dark_red"      onClick={(e)=>changeColor("dark_red")}>{text5[0]}</div>
                                <div className="text5 purple"        onClick={(e)=>changeColor("purple")}>{text5[1]}</div>
                                <div className="text5 blue"          onClick={(e)=>changeColor("blue")}>{text5[2]}</div>
                                <div className="text5 light_blue"    onClick={(e)=>changeColor("light_blue")}>{text5[3]}</div>
                                <div className="text5 green"         onClick={(e)=>changeColor("green")}>{text5[4]}</div>
                                <div className="text5 dark_yellow"   onClick={(e)=>changeColor("dark_yellow")}>{text5[5]}</div>
                                <div className="text5 medium_yellow" onClick={(e)=>changeColor("medium_yellow")}>{text5[6]}</div>
                                <div className="text5 lemon"         onClick={(e)=>changeColor("lemon")}>{text5[7]}</div>
                                <div className="text5 yellow"        onClick={(e)=>changeColor("yellow")}>{text5[8]}</div>
                                <div className="text5 orange"        onClick={(e)=>changeColor("orange")}>{text5[9]}</div>
                                <div className="text5 red"           onClick={(e)=>changeColor("red")}>{text5[10]}</div>
                            </div>
                        <div className="titleText">{text0[2]}</div>
                        <div className="titleText">{text0[3]}</div>
                        </div>
                    </div>
                </div>
                <div className={(show ? 'chooseBox' : 'hidden')}>
                    <div className="chooseBoxinner">
                        <div className="leftPart">{text4}</div>
                        <div className="rightPart">
                            {colorArr.map((e, i) =>
                                <div key={i} className={"choice " + "hover_" + e} onClick={()=>changeColor(e)}>
                                    {text5[i]}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={(block1.colorBar ? ('colorBar ' + (typeColors)+"_bgc"): 'hidden') }>
                <div className="typebox">
                    <div className="type">test{" > "}</div>
                    <div className="type">test</div>
                </div>
            </div>
            <div className="text-box">
                <div className="text">
                    <div className={(block1.textTitle ? ('textTitle ' + (typeColors)): 'hidden')}>{text1[0]}</div>
                    <div className={(block1.logo ? 'logo' : 'hidden')}>
                        <div className="icon-logo_hill_side">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                        </div>
                    </div>
                    <p className="content">{text1[1] }</p>          
                    <p className="content">{text1[2] }</p>
                </div>
                <div className={(block1.roundButton ? 'roundButton' : 'hidden')}>
                    <div className="icon-composant">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                </div>
                <div className={(block1.brands ? 'brands' : 'hidden')}>
                    <div className="icon-lower">
                        <Image src={label_1} width={100} height={24}></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_2} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_3} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_4} ></Image>
                    </div>
                </div>
                <div className={(block1.infos ? 'infos' : 'hidden') }>
                    <div className="line1">
                        <text className="title">title:</text>
                        <text className="content"> content</text>
                    </div>
                    <div className="line2">
                    <text className="title">title:</text>
                        <text className="content"> content</text>
                    </div>
                    <div className="line3">
                    <text className="title">title:</text>
                        <text className="content"> content</text>
                    </div>
                </div>
                <div className={(block1.button ? 'button':'hidden')}>
                    <div className="icon-mail"></div>
                    <div className="title-color-text">button</div>
                </div>
            </div>
            <div className={"arcBox " + (typeColors)+"_bgc07"}>
                <div className={(block1.person ? 'hidden' : 'mwhiteText')}>
                </div>
                <div className={(block1.person ? 'person' : 'hidden')}>
                    <div className="mimage">
                        <Image src={src} width={1600} height={1600}></Image>
                    </div>
                        
                </div>
            </div>
            <div className="white-ball-box">
                <div className="white-ball"></div>
            </div>
            <div className="white-box">
                <div className="color-ball"></div>
            </div>
        </div>
    </div>
    )
}
const Block4_2=({text1,text2,text3,text4,text5}:Block4_2Props)=>{
    let src1=require(`../../public/styles/src/page3/graphique@2x.png`).default
    let src2=require(`../../public/styles/src/page3/organigrame@2x.png`).default
    let src3=require(`../../public/styles/src/page4/Groupe408@2x.png`).default
    let src4=require(`../../public/styles/src/page4/Groupe409@2x.png`).default
    let src5=require(`../../public/styles/src/page4/Groupe410@2x.png`).default
    let src6=require(`../../public/styles/src/page4/Groupe411@2x.png`).default
    return(
        <div className="block4_2">
            <div className="ActivitePart">
                <div className="left">
                    <Image  src={src1} alt="brand1" className="brand"/>
                </div>
                <div className="right">
                    <div className="text">
                        <div className="title">{text1[0]}</div>
                        <div className="content">{text1[1]}</div>
                    </div>
                    <div className="picture">
                        <Image  src={src2} alt="brand1" className="brand"/>
                    </div>
                </div>
            </div>
            {/* <div className="clientPart">
                <div className="left">
                    <Client className="leftSvg"></Client>
                </div>
                <div className="right">
                    <Mds></Mds>
                </div>
            </div> */}
            <div className="mclientPart">
                <div className="picture">
                    <Image  src={src3} alt="brand1" className="brand"/>
                </div>
                <div className="picture">
                    <Image  src={src4} alt="brand1" className="brand"/>
                </div>
                <div className="picture">
                    <Image  src={src5} alt="brand1" className="brand"/>
                </div>
                <div className="picture">
                    <Image  src={src6} alt="brand1" className="brand"/>
                </div>
            </div>
            <div className="clientPart">
                <div className="left">
                    <div className="mds">3 Mds €</div>
                    <div className="de">{'de chiffre d\'affaires'}</div>
                    <div className="infos">
                        <div className="info">
                            <div className="line1">2<sup>e</sup></div>
                            <div className="line2">{text2[0]}</div>
                            <div className="line3"></div>
                            <div className="line4">{text2[4]}</div>
                        </div>
                        <div className="info">
                            <div className="line1">
                                <text className="five">5,3<text className="mds"> Mds<sup>2</sup></text></text>
                            </div>
                            <div className="line2">{text2[1]}</div>
                            <div className="line3"></div>
                            <div className="line4">{text2[5]}</div>
                        </div>
                        <div className="info">
                            <div className="line1"> 1<sup>er</sup></div>
                            <div className="line2">{text2[2]}</div>
                        </div>
                        <div className="info">
                            <div className="line1"> 1<sup>er</sup></div>
                            <div className="line2">{text2[3]}</div>
                            <div className="line3"></div>
                            <div className="line4">{text2[6]}</div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="client">{text3[0]}</div>
                    <div className="clientContent">
                        <div className="item">
                            <div className="firstTitle">{text3[1]}<sup>{text3[2]}</sup></div>
                            <div className="clientText">{text3[5]}</div>
                        </div>
                        <div className="item">
                            <div className="secondTitle">{text3[3]}</div>
                            <div className="clientText">{text3[6]}</div>
                        </div>
                        <div className="item">
                            <div className="thirdTitle">{text3[4]}</div>
                            <div className="clientText">{text3[7]}</div>
                        </div>
                    </div>
                    <div className="coll">{text4[0]}</div>
                    <div className="collContent">
                        <div className="item">
                            <div className="firstTitle">{text4[1]}</div>
                            <div className="clientText">{text4[3]}</div>
                        </div>
                        <div className="item2">
                            <div className="secondTitle">{text4[2]}</div>
                            <div className="clientText2">{text4[4]}</div>
                        </div>
                    </div>
                    <div className="climat">{text5[0]}</div>
                    <div className="climatContent">
                        <div className="item">
                            <div className="firstTitle">{text5[1]}</div>
                            <div className="clientText">{text5[3]}</div>
                        </div>
                        <div className="item2">
                            <div className="secondTitle">{text5[2]}</div>
                            <div className="clientText2">{text5[4]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Block4_3=({text1,text2}:Block4_3Props)=>{
    let src=require(`../../public/styles/src/page3/image_page_groupe_1@2x.png`).default
    return(
        <div className="block4_3">
            <div className="top">
                <div className="left">
                    <div className="icon-cogedim"></div>
                    <div className="content">{text1[0]}</div>
                </div>
                <div className="right">
                    <div className="content2">{text1[1]}</div>
                    <div className="content2">{text1[2]}</div>
                </div>
            </div>
            <div className="bottom">
                <div className="bottom-box">
                    <div className="left">
                        <div className="title">{text2[0]}</div>
                        <div className="content">{text2[1]}</div>
                        <div className="content">{text2[2]}</div>
                    </div>
                </div>
                <div className="right">
                        <div className="rightPicture">
                            <Image  src={src} alt="brand1" className="image"/>
                        </div>
                        <div className="smallText">{text2[3]}</div>
                    </div>
            </div>
        </div>
    )
}
const Block4_4=({text1,text2}:Block4_4Props)=>{
    let src2=require(`../../public/styles/src/page3/image_page_groupe_2@2x.png`).default
    let src3=require(`../../public/styles/src/page3/image_page_groupe_3@2x.png`).default
    let src4=require(`../../public/styles/src/page3/image_page_groupe_4@2x.png`).default
    return(
        <div className="block4_4">
            <div className="arrows">
                <div className="title">
                    {text1[0]}
                </div>
                <div className="arrowsPart">
                    <div className="left">
                        <div className="line">{text1[1]}</div>
                        <div className="line">{text1[2]}</div>
                    </div>
                    <div className="middle">
                        <div className="vertical"></div>
                        <div className="triangle"></div>
                    </div>
                    <div className="right">
                        <div className="line">{text1[3]}</div>
                        <div className="line">{text1[4]}</div>
                    </div>
                </div>
                <div className="bottom">{text1[5]}</div>
            </div>
            <div className="pictures">
                <div className="pictureBox">
                    <Image  src={src2} alt="brand1" className="image" width={800} height={552}/>
                    <div className="title">{text2[0]}</div>
                </div>
                <div className="pictureBox">
                    <Image  src={src3} alt="brand1" className="image" width={800} height={552}/>
                    <div className="title">{text2[1]}</div>
                </div>
                <div className="pictureBox">
                    <Image  src={src4} alt="brand1" className="image" width={800} height={552}/>
                    <div className="title">{text2[2]}</div>
                </div>
            </div>
        </div>
    )
}
//page5
const Block5_1 = ({text0, text1, text2, text3, text4, text5}: Block5_1Props) => {
    const block1={  'colorBar':false,
            'textTitle':true,
            'logo':false,
            'roundButton':true,
            "brands":false,
            "infos":false,
            "button":false,
            "whiteText":true,
            "person":false}
    let label_1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let label_2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let label_3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let label_4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    const move_down=()=>{
        scrollTo({
            top:16290,left:0,behavior:"smooth"
        })
    }
    const [show, setShow] = useState(false)
    const show_box=()=>{
        setShow(!show)
    }
    const [show2, setShow2] = useState(false)
    const show_box2=()=>{
        setShow2(!show2)
    }
    const [showi,showInput] =useState(false)
    const show_input=()=>{
        showInput(!showi)
    }
    let [typeColors,changeType] =useState('dark_purple')
    const changeColor=(e:string)=>{
        changeType(typeColors=e)
        // console.log(typeColors)
    }
    return (

    <div className="block5_1">
        <div className="imageBox">
            <div className="Header">
                <div className="left">
                    <div className="icon-logo_purple">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                        <span className="path6"></span>
                        <span className="path7"></span>
                        <span className="path8"></span>
                        <span className="path9"></span>
                        <span className="path10"></span>
                    </div>
                    <div className="icon-burger_menu" onClick={show_box}></div>
                </div>
                <div className="title-text">{text0[0]}</div>
                <div className="title-text" onClick={show_box}>{text0[1]}</div>
                <div className="title-text">{text0[2]}</div>
                <div className="button" onClick={show_input}>
                    <div className="icon-mail"></div>
                    <div className="title-color-text">{text0[3]}</div>
                </div>
                <div className={(show ? 'mchooseBox' : 'hidden')}>
                    <div className="Part">
                        <div className="leftPart"></div>
                        <div className="rightPart">
                        <div className="titleText">{text0[0]}</div>
                        <div className="titleText " onClick={show_box2}>{text0[1]}
                        </div>
                            <div className={(show2 ? 'contentText' : 'hidden')}>
                                <div className="text5 dark_red"      onClick={(e)=>changeColor("dark_red")}>{text5[0]}</div>
                                <div className="text5 purple"        onClick={(e)=>changeColor("purple")}>{text5[1]}</div>
                                <div className="text5 blue"          onClick={(e)=>changeColor("blue")}>{text5[2]}</div>
                                <div className="text5 light_blue"    onClick={(e)=>changeColor("light_blue")}>{text5[3]}</div>
                                <div className="text5 green"         onClick={(e)=>changeColor("green")}>{text5[4]}</div>
                                <div className="text5 dark_yellow"   onClick={(e)=>changeColor("dark_yellow")}>{text5[5]}</div>
                                <div className="text5 medium_yellow" onClick={(e)=>changeColor("medium_yellow")}>{text5[6]}</div>
                                <div className="text5 lemon"         onClick={(e)=>changeColor("lemon")}>{text5[7]}</div>
                                <div className="text5 yellow"        onClick={(e)=>changeColor("yellow")}>{text5[8]}</div>
                                <div className="text5 orange"        onClick={(e)=>changeColor("orange")}>{text5[9]}</div>
                                <div className="text5 red"           onClick={(e)=>changeColor("red")}>{text5[10]}</div>
                            </div>
                        <div className="titleText">{text0[2]}</div>
                        <div className="titleText">{text0[3]}</div>
                        </div>
                    </div>
                </div>
                <div className={(show ? 'chooseBox' : 'hidden')}>
                    <div className="chooseBoxinner">
                        <div className="leftPart">{text4}</div>
                        <div className="rightPart">
                            {colorArr.map((e, i) =>
                                <div key={i} className={"choice " + "hover_" + e} onClick={()=>changeColor(e)}>
                                    {text5[i]}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={(block1.colorBar ? ('colorBar ' + (typeColors)+"_bgc"): 'hidden') }>
                <div className="typebox">
                    <div className="type">test{" > "}</div>
                    <div className="type">test</div>
                </div>
            </div>
            <div className="text-box">
                <div className="text">
                    <div className={(block1.textTitle ? ('textTitle ' + (typeColors)): 'hidden')}>{text1}</div>
                    <div className={(block1.logo ? 'logo' : 'hidden')}>
                        <div className="icon-logo_hill_side">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                        </div>
                    </div>
                    <p className="content">{text2[0]}</p>          
                </div>
                <div className={(block1.roundButton ? 'roundButton' : 'hidden')} onClick={move_down}>
                    <div className="icon-composant">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                </div>
                <div className={(block1.brands ? 'brands' : 'hidden')}>
                    <div className="icon-lower">
                        <Image src={label_1} width={100} height={24}></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_2} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_3} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_4} ></Image>
                    </div>
                </div>
                <div className={(block1.infos ? 'infos' : 'hidden') }>
                </div>
                <div className={(block1.button ? 'button':'hidden')} onClick={show_input}>
                        <div className="icon-mail"></div>
                        <div className="title-color-text">{text0[3]}</div>
                </div>
            </div>
            <div className={"arcBox " + (typeColors)+"_bgc07"}>
                <div className={(block1.person ? 'hidden' : 'mwhiteText')}>
                    {text3[1]}
                </div>
                <div className={(block1.person ? 'person' : 'hidden')}>
                    <Image src={label_1}></Image>
                </div>
            </div>
            <div className="white-text-box">
                <div className="white-text">
                    <text>{text3[0]}</text>
                    <text>{text3[1]}</text>
                </div>
            </div>
            <div className="white-ball-box">
                <div className="white-ball"></div>
            </div>
            <div className="white-box">
                <div className="color-ball"></div>
            </div>
        </div>
    </div>
    )
}
const Block5_2=({text1,text2}:Block5_2Props)=>{
    let src1=require(`../../public/styles/src/page4/image_page_reference_2@2x.png`).default
    let src2=require(`../../public/styles/src/page4/image_page_reference_3@2x.png`).default
    let brand1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let brand2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let brand3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let brand4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    return(
        <div className="block5_2">
            <div className="community">
                <div className='left'>
                    <Image  src={src1} alt="brand1" width={940} height={500}/>
                </div>
                <div className='right'>
                    <div className="title">{text1[0]}</div>
                    <div className="introduce">{text1[1]}</div>
                    <div className="content">{text1[2]}</div>
                    <div className="brands">
                        <div className="brand1">
                            <Image  src={brand1} alt="brand1" width={100} height={24} className="brand1"/>
                        </div>
                        <div className="brand2">
                        <Image  src={brand2} alt="brand1" width={58} height={50} />
                        </div>
                        <div className="brand2">
                        <Image  src={brand3} alt="brand1" width={68} height={50} />
                        </div>
                        <div className="brand2">
                        <Image  src={brand4} alt="brand1" width={114} height={50} />
                        </div>
                    </div>
                    <div className="button">{text1[3]}</div>
                </div>
            </div>
            <div className="nom">
                <div className="mright">
                    <Image  src={src1} alt="brand1" width={940} height={500}/>
                </div>
                <div className="left-box">
                    <div className="left">
                        <div className="title">{text2[0]}</div>
                        <div className="introduce">{text2[1]}</div>
                        <div className="content">{text2[2]}</div>
                        <div className="brands">
                            <div className="brand1">
                                <Image  src={brand1} alt="brand1" width={100} height={24} className="brand1"/>
                            </div>
                            <div className="brand2">
                            <Image  src={brand2} alt="brand1" width={58} height={50} />
                            </div>
                            <div className="brand2">
                            <Image  src={brand3} alt="brand1" width={68} height={50} />
                            </div>
                            <div className="brand2">
                            <Image  src={brand4} alt="brand1" width={114} height={50} />
                            </div>
                        </div>
                        <div className="button">{text2[3]}</div>
                    </div>
                </div>
                <div className="right">
                    <Image  src={src2} alt="brand1" width={580} height={500}/>
                </div>
            </div>
            <div className="mnom">
                <div className="mright">
                    <Image  src={src1} alt="brand1" width={940} height={500}/>
                </div>
                <div className="left-box">
                    <div className="left">
                        <div className="title">{text2[0]}</div>
                        <div className="introduce">{text2[1]}</div>
                        <div className="content">{text2[2]}</div>
                        <div className="brands">
                            <div className="brand1">
                                <Image  src={brand1} alt="brand1" width={100} height={24} className="brand1"/>
                            </div>
                            <div className="brand2">
                            <Image  src={brand2} alt="brand1" width={58} height={50} />
                            </div>
                            <div className="brand2">
                            <Image  src={brand3} alt="brand1" width={68} height={50} />
                            </div>
                            <div className="brand2">
                            <Image  src={brand4} alt="brand1" width={114} height={50} />
                            </div>
                        </div>
                        <div className="button">{text2[3]}</div>
                    </div>
                </div>
                <div className="right">
                    <Image  src={src2} alt="brand1" width={580} height={500}/>
                </div>
            </div>
        </div>
    )
}
const Block5_3=({text1,text2}:Block5_3Props)=>{
    let src1=require(`../../public/styles/src/page4/image_page_reference_4@2x.png`).default
    let src2=require(`../../public/styles/src/page4/image_page_reference_5@2x.png`).default
    let brand1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let brand2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let brand3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let brand4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    return(
        <div className="block5_3">
            <div className="images">
                <div className='left'>
                    <Image  src={src1} alt="brand1" width={940} height={500}/>
                </div>
                <div className="right">
                    <Image  src={src2} alt="brand1" width={940} height={500}/>
                </div>
            </div>
            <div className="texts">
                <div className="leftBox">
                    <div className="left">
                        <div className="title">{text2[0]}</div>
                        <div className="introduce">{text2[1]}</div>
                        <div className="content">{text2[2]}</div>
                        <div className="brands">
                            <div className="brand1">
                                <Image  src={brand1} alt="brand1" width={100} height={24} className="brand1"/>
                            </div>
                            <div className="brand2">
                            <Image  src={brand2} alt="brand1" width={58} height={50} />
                            </div>
                            <div className="brand2">
                            <Image  src={brand3} alt="brand1" width={68} height={50} />
                            </div>
                            <div className="brand2">
                            <Image  src={brand4} alt="brand1" width={114} height={50} />
                            </div>
                        </div>
                        <div className="button">{text2[3]}</div>
                    </div>
                </div>
                <div className='right'>
                    <div className="title">{text1[0]}</div>
                    <div className="introduce">{text1[1]}</div>
                    <div className="content">{text1[2]}</div>
                    <div className="brands">
                        <div className="brand1">
                            <Image  src={brand1} alt="brand1" width={100} height={24} className="brand1"/>
                        </div>
                        <div className="brand2">
                        <Image  src={brand2} alt="brand1" width={58} height={50} />
                        </div>
                        <div className="brand2">
                        <Image  src={brand3} alt="brand1" width={68} height={50} />
                        </div>
                        <div className="brand2">
                        <Image  src={brand4} alt="brand1" width={114} height={50} />
                        </div>
                    </div>
                    <div className="button">{text1[3]}</div>
                </div>
            </div>

        </div>
    )
}
const Block5_4=({text1}:Block5_4Props)=>{
    let src1=require(`../../public/styles/src/page4/image_page_reference_6@2x.png`).default
    let brand1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let brand2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let brand3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let brand4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    return(
        <div className="block5_4">
            <div className="images">
                <Image  src={src1} alt="brand1"/>
            </div>
            <div className="texts">
                <div className="title">{text1[0]}</div>
                <div className="introduce">{text1[1]}</div>
                <div className="content">{text1[2]}</div>
                <div className="brands">
                    <div className="brand1">
                    <Image  src={brand1} alt="brand1" width={100} height={24} className="brand1"/>
                    </div>
                    <div className="brand2">
                    <Image  src={brand2} alt="brand1" width={58} height={50} />
                    </div>
                    <div className="brand2">
                    <Image  src={brand3} alt="brand1" width={68} height={50} />
                    </div>
                    <div className="brand2">
                    <Image  src={brand4} alt="brand1" width={114} height={50} />
                    </div>
                </div>
                <div className="button">{text1[3]}</div>
            </div>
        </div>
    )
}
const Block5_5=({text1,text2}:Block5_5Props)=>{
    let src1=require(`../../public/styles/src/page4/image_page_reference_2@2x.png`).default
    let src2=require(`../../public/styles/src/page4/image_page_reference_3@2x.png`).default
    let brand1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let brand2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let brand3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let brand4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    return(
        <div className="block5_5">
            <div className="community">
                <div className="leftBox">
                    <div className='left'>
                        <div className="title">{text1[0]}</div>
                        <div className="introduce">{text1[1]}</div>
                        <div className="content">{text1[2]}</div>
                        <div className="brands">
                            <div className="brand1">
                                <Image  src={brand1} alt="brand1" width={100} height={24} className="brand1"/>
                            </div>
                            <div className="brand2">
                                <Image  src={brand2} alt="brand1" width={58} height={50} />
                            </div>
                            <div className="brand2">
                                <Image  src={brand3} alt="brand1" width={68} height={50} />
                            </div>
                            <div className="brand2">
                                <Image  src={brand4} alt="brand1" width={114} height={50} />
                            </div>
                        </div>
                        <div className="button">{text1[3]}</div>
                    </div>
                </div>
                <div className='right'>
                    <Image  src={src1} alt="brand1" width={940} height={500}/>
                </div>
            </div>
            <div className="nom">
                <div className="left">
                    <Image  src={src2} alt="brand1" width={580} height={500}/>
                </div>
                <div className="right">
                    <div className="title">{text2[0]}</div>
                    <div className="introduce">{text2[1]}</div>
                    <div className="content">{text2[2]}</div>
                    <div className="brands">
                        <div className="brand1">
                            <Image  src={brand1} alt="brand1" width={100} height={24} className="brand1"/>
                        </div>
                        <div className="brand2">
                        <Image  src={brand2} alt="brand1" width={58} height={50} />
                        </div>
                        <div className="brand2">
                        <Image  src={brand3} alt="brand1" width={68} height={50} />
                        </div>
                        <div className="brand2">
                        <Image  src={brand4} alt="brand1" width={114} height={50} />
                        </div>
                    </div>
                    <div className="button">{text2[3]}</div>
                </div>
            </div>
        </div>
    )
}

//page6
const Block6_1 = ({text0, text1, text3, text4, text5}: Block6_1Props) => {
    const block1={  'colorBar':true,
            'textTitle':true,
            'logo':false,
            'roundButton':false,
            "brands":true,
            "infos":false,
            "button":true,
            "whiteText":true,
            "person":false}
    let label_1=require(`../../public/styles/src/page4/label_1@2x.png`).default
    let label_2=require(`../../public/styles/src/page4/label_2@2x.png`).default
    let label_3=require(`../../public/styles/src/page4/label_3@2x.png`).default
    let label_4=require(`../../public/styles/src/page4/label_4@2x.png`).default
    const [show, setShow] = useState(false)
    const show_box=()=>{
        setShow(!show)
    }
    const [show2, setShow2] = useState(false)
    const show_box2=()=>{
        setShow2(!show2)
    }
    const [showi,showInput] =useState(false)
    const show_input=()=>{
        showInput(!showi)
    }
    let [typeColors,changeType] =useState('dark_purple')
    const changeColor=(e:string)=>{
        changeType(typeColors=e)
        // console.log(typeColors)
    }
    return (
    <div className="block6_1">
        <div className="imageBox">
            <div className="Header">
                <div className="left">
                    <div className="icon-logo_purple">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                        <span className="path6"></span>
                        <span className="path7"></span>
                        <span className="path8"></span>
                        <span className="path9"></span>
                        <span className="path10"></span>
                    </div>
                    <div className="icon-burger_menu" onClick={show_box}></div>
                </div>
                <div className="title-text">{text0[0]}</div>
                <div className="title-text" onClick={show_box}>{text0[1]}</div>
                <div className="title-text">{text0[2]}</div>
                <div className="button" onClick={show_input}>
                    <div className="icon-mail"></div>
                    <div className="title-color-text">{text0[3]}</div>
                </div>
                <div className={(show ? 'mchooseBox' : 'hidden')}>
                    <div className="Part">
                        <div className="leftPart"></div>
                        <div className="rightPart">
                        <div className="titleText">{text0[0]}</div>
                        <div className="titleText " onClick={show_box2}>{text0[1]}
                        </div>
                            <div className={(show2 ? 'contentText' : 'hidden')}>
                                <div className="text5 dark_red"      onClick={(e)=>changeColor("dark_red")}>{text5[0]}</div>
                                <div className="text5 purple"        onClick={(e)=>changeColor("purple")}>{text5[1]}</div>
                                <div className="text5 blue"          onClick={(e)=>changeColor("blue")}>{text5[2]}</div>
                                <div className="text5 light_blue"    onClick={(e)=>changeColor("light_blue")}>{text5[3]}</div>
                                <div className="text5 green"         onClick={(e)=>changeColor("green")}>{text5[4]}</div>
                                <div className="text5 dark_yellow"   onClick={(e)=>changeColor("dark_yellow")}>{text5[5]}</div>
                                <div className="text5 medium_yellow" onClick={(e)=>changeColor("medium_yellow")}>{text5[6]}</div>
                                <div className="text5 lemon"         onClick={(e)=>changeColor("lemon")}>{text5[7]}</div>
                                <div className="text5 yellow"        onClick={(e)=>changeColor("yellow")}>{text5[8]}</div>
                                <div className="text5 orange"        onClick={(e)=>changeColor("orange")}>{text5[9]}</div>
                                <div className="text5 red"           onClick={(e)=>changeColor("red")}>{text5[10]}</div>
                            </div>
                        <div className="titleText">{text0[2]}</div>
                        <div className="titleText">{text0[3]}</div>
                        </div>
                    </div>
                </div>
                <div className={(show ? 'chooseBox' : 'hidden')}>
                    <div className="chooseBoxinner">
                        <div className="leftPart">{text4}</div>
                        <div className="rightPart">
                            {colorArr.map((e, i) =>
                                <div key={i} className={"choice " + "hover_" + e} onClick={()=>changeColor(e)}>
                                    {text5[i]}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={(block1.colorBar ? ('colorBar ' + (typeColors)+"_bgc"): 'hidden') }>
                <div className="typebox">
                    <div className="type">test{" > "}</div>
                    <div className="type">test</div>
                </div>
            </div>
            <div className="text-box">
                <div className="text">
                    <div className={(block1.textTitle ? ('textTitleSmall ' + (typeColors)): 'hidden')}>{text1[0]}</div>
                    <div className={(block1.textTitle ? ('textTitle ' + (typeColors)): 'hidden')}>{text1[1]}</div>
                    <div className={(block1.logo ? 'logo' : 'hidden')}>
                        <div className="icon-logo_hill_side">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                        </div>
                    </div>
                    <p className="content">{text1[2]}</p>          
                </div>
                <div className={(block1.roundButton ? 'roundButton' : 'hidden')}>
                    <div className="icon-composant">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                </div>
                <div className={(block1.brands ? 'brands' : 'hidden')}>
                    <div className="icon-lower">
                        <Image src={label_1} width={100} height={24}></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_2} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_3} ></Image>
                    </div>
                    <div className="icon">
                        <Image src={label_4} ></Image>
                    </div>
                </div>
                <div className={(block1.infos ? 'infos' : 'hidden') }>
                </div>
                <div className={(block1.button ? 'button':'hidden')} onClick={show_input}>
                        <div className="icon-mail"></div>
                        <div className="title-color-text">{text0[3]}</div>
                </div>
            </div>
            <div className={"arcBox " + (typeColors)+"_bgc03"}>
                <div className={(block1.person ? 'hidden' : 'mwhiteText')}>
                    {text3[1]}
                </div>
                <div className={(block1.person ? 'person' : 'hidden')}>
                    <Image src={label_1}></Image>
                </div>
            </div>
            <div className="white-text-box">
                <div className="white-text">
                    <text>{text3[0]}</text>
                    <text>{text3[1]}</text>
                </div>
            </div>
            <div className="white-ball-box">
                <div className="white-ball"></div>
            </div>
            <div className="white-box">
                <div className="color-ball"></div>
            </div>
        </div>
    </div>
    )
}
const Block6_2=({text1,text2,text3,text4}:Block6_2Props)=>{
    let arr=[];
    for(let i=0;i<text2.length;i++){
        // console.log(i,`../../public/styles/src/image_home_${i}@2x.png`)
        let obj={ 'title':text2[i],"content":text3[i]}
        arr.push(obj)
    }
    let src1=require(`../../public/styles/src/page4/image_page_reference_2@2x.png`).default
    let src2=require(`../../public/styles/src/page4/image_page_reference_7@2x.png`).default
    let src3=require(`../../public/styles/src/page4/image_page_reference_3@2x.png`).default
    let src4=require(`../../public/styles/src/page4/image_page_reference_4@2x.png`).default
    return(
        <div className="block6_2">
            <div className="first">
                <div className="left">
                    <Image  src={src1} alt="brand1" width={1200} height={640} className="brand1"/>
                </div>
                <div className="right">
                    <Image  src={src2} alt="brand1" width={1200} height={1035} className="brand1"/>
                </div>
            </div>
            <div className="second">
                <div className="leftBox">
                    <div className="left">
                        <Image  src={src3} alt="brand1" width={1200} height={1035} className="brand1"/>
                    </div>
                </div>
                <div className="right">
                    <div className="title">{text1}</div>
                    {  
                    arr.map((e,i)=>
                    <div className="line" key={i}>
                        <text className="bold">{e.title}</text>
                        <text className="content">{e.content}</text>
                    </div>
                    )}
                </div>
            </div>
            <div className="third">
                <div className="leftBox">
                    <div className="left">
                        {text4}
                    </div>
                </div>
                <div className="right">
                    <Image  src={src4} alt="brand1" width={1200} height={640} className="brand1"/>
                </div>
            </div>
        </div>
    )
}
const Block6_3=({text1,text2,text3}:Block6_3Props)=>{
    let src=require(`../../public/styles/src/page5/logo_page_projet_reference@2x.png`).default
    let src1=require(`../../public/styles/src/page5/image_page_projet_reference_2@2x.png`).default
    let src2=require(`../../public/styles/src/page4/image_page_reference_4@2x.png`).default
    return(
        <div className="block6_3">
            <div className="headline">{text1}</div>
            <div className="firstParagraph">
                <div className="left">
                    <div className="title">{text2[0]}</div>
                    <div className="content">{text3[0]}</div>
                    <div className="title">{text2[1]}</div>
                    <div className="content">{text3[1]}</div>
                    <div className="title">{text2[2]}</div>
                    <div className="content">{text3[2]}</div>
                </div>
                <div className="right">
                    <div className="title">{text2[3]}</div>
                    <div className="brand">
                        <Image  src={src} alt="brand1" className="image" width={208} height={100}/>
                    </div>
                    <div className="content">{text3[3]}</div>
                </div>
            </div>
            <div className="secondParagraph">
                <div className="leftBox">                
                    <div className="left">
                        <Image  src={src1} alt="brand1" className="image" width={1200} height={1035}/>
                    </div>
                </div>
                <div className="right">
                    <Image  src={src2} alt="brand1" className="image" width={1200} height={640}/>
                </div>
            </div>

        </div>
    )
}

const EmptyBlock=()=>{
    return (
        <div className="EmptyBlock"></div>
    )
}
export default Block