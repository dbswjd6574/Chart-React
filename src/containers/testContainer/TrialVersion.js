import React from 'react';
import { LeftArea, CenterArea, ChartSelect } from 'components';
import MuiThemeProvider from '../../../node_modules/material-ui/styles/MuiThemeProvider';
import getMuiTheme from '../../../node_modules/material-ui/styles/getMuiTheme';
import darkBaseTheme from '../../../node_modules/material-ui/styles/baseThemes/darkBaseTheme';
import update from 'react-addons-update';

var menuItem=[{name:"Test1", hasChild:true, child:[{name:"child1"}]}, {name:"Test2", hasChild:false, child:[]},
              {name:"Test3", hasChild:true, child:[{name:"child3"}]}, {name:"Test4", hasChild:false, child:[]}
];
var jsonObject = {
    "DATA" : [
        {"STAT_NM":"강동1","INCOME_DATE":"20141231","TIME_09":1513,"TIME_08":3262,"TIME_07":2585,"TIME_06":764,"TIME_05":329,"TIME_23":202,"TIME_22":499,"TIME_21":635,"TIME_20":811,"TIME_24":108,"ON_OFF_SE":"승차","TIME_18":1717,"TIME_17":1755,"TIME_SM":22725,"TIME_19":1146,"TIME_10":1043,"LINE_NM":"5호선","TIME_12":1072,"TIME_11":943,"TIME_14":1035,"TIME_13":1029,"TIME_16":1191,"TIME_15":1086},
        {"STAT_NM":"강동2","INCOME_DATE":"20141231","TIME_09":798,"TIME_08":1468,"TIME_07":714,"TIME_06":532,"TIME_05":34,"TIME_23":612,"TIME_22":959,"TIME_21":959,"TIME_20":1135,"TIME_24":679,"ON_OFF_SE":"하차","TIME_18":1902,"TIME_17":1388,"TIME_SM":18367,"TIME_19":1655,"TIME_10":610,"LINE_NM":"5호선","TIME_12":617,"TIME_11":612,"TIME_14":788,"TIME_13":784,"TIME_16":1171,"TIME_15":950},
        {"STAT_NM":"개롱1","INCOME_DATE":"20141231","TIME_09":436,"TIME_08":818,"TIME_07":1041,"TIME_06":270,"TIME_05":94,"TIME_23":58,"TIME_22":135,"TIME_21":179,"TIME_20":238,"TIME_24":28,"ON_OFF_SE":"승차","TIME_18":582,"TIME_17":545,"TIME_SM":7700,"TIME_19":405,"TIME_10":354,"LINE_NM":"5호선","TIME_12":449,"TIME_11":430,"TIME_14":404,"TIME_13":359,"TIME_16":484,"TIME_15":391},
        {"STAT_NM":"개롱2","INCOME_DATE":"20141231","TIME_09":364,"TIME_08":721,"TIME_07":252,"TIME_06":102,"TIME_05":28,"TIME_23":257,"TIME_22":389,"TIME_21":323,"TIME_20":473,"TIME_24":229,"ON_OFF_SE":"하차","TIME_18":712,"TIME_17":588,"TIME_SM":7510,"TIME_19":666,"TIME_10":283,"LINE_NM":"5호선","TIME_12":325,"TIME_11":262,"TIME_14":334,"TIME_13":312,"TIME_16":485,"TIME_15":405},
        {"STAT_NM":"개화산1","INCOME_DATE":"20141231","TIME_09":421,"TIME_08":805,"TIME_07":961,"TIME_06":278,"TIME_05":124,"TIME_23":68,"TIME_22":192,"TIME_21":186,"TIME_20":197,"TIME_24":37,"ON_OFF_SE":"승차","TIME_18":722,"TIME_17":473,"TIME_SM":7107,"TIME_19":316,"TIME_10":335,"LINE_NM":"5호선","TIME_12":319,"TIME_11":306,"TIME_14":281,"TIME_13":347,"TIME_16":434,"TIME_15":305},
        {"STAT_NM":"개화산2","INCOME_DATE":"20141231","TIME_09":267,"TIME_08":780,"TIME_07":266,"TIME_06":145,"TIME_05":8,"TIME_23":227,"TIME_22":318,"TIME_21":359,"TIME_20":438,"TIME_24":153,"ON_OFF_SE":"하차","TIME_18":529,"TIME_17":475,"TIME_SM":6295,"TIME_19":588,"TIME_10":201,"LINE_NM":"5호선","TIME_12":249,"TIME_11":194,"TIME_14":233,"TIME_13":251,"TIME_16":312,"TIME_15":302},
        {"STAT_NM":"약수(6)1","INCOME_DATE":"20140808","TIME_09":336,"TIME_08":696,"TIME_07":175,"TIME_06":63,"TIME_05":12,"TIME_23":120,"TIME_22":120,"TIME_21":143,"TIME_20":181,"TIME_24":33,"ON_OFF_SE":"하차","TIME_18":320,"TIME_17":199,"TIME_SM":3905,"TIME_19":279,"TIME_10":211,"LINE_NM":"6호선","TIME_12":167,"TIME_11":165,"TIME_14":214,"TIME_13":159,"TIME_16":155,"TIME_15":157},
        {"STAT_NM":"역촌1","INCOME_DATE":"20140808","TIME_09":290,"TIME_08":670,"TIME_07":620,"TIME_06":210,"TIME_05":69,"TIME_23":29,"TIME_22":63,"TIME_21":96,"TIME_20":117,"TIME_24":12,"ON_OFF_SE":"승차","TIME_18":237,"TIME_17":189,"TIME_SM":4148,"TIME_19":144,"TIME_10":224,"LINE_NM":"6호선","TIME_12":228,"TIME_11":194,"TIME_14":177,"TIME_13":215,"TIME_16":173,"TIME_15":191},
        {"STAT_NM":"역촌2","INCOME_DATE":"20140808","TIME_09":182,"TIME_08":296,"TIME_07":159,"TIME_06":97,"TIME_05":12,"TIME_23":201,"TIME_22":283,"TIME_21":243,"TIME_20":323,"TIME_24":112,"ON_OFF_SE":"하차","TIME_18":546,"TIME_17":289,"TIME_SM":4373,"TIME_19":498,"TIME_10":147,"LINE_NM":"6호선","TIME_12":147,"TIME_11":151,"TIME_14":156,"TIME_13":147,"TIME_16":215,"TIME_15":169},
        {"STAT_NM":"연신내(6)1","INCOME_DATE":"20140808","TIME_09":759,"TIME_08":1329,"TIME_07":986,"TIME_06":279,"TIME_05":141,"TIME_23":184,"TIME_22":596,"TIME_21":519,"TIME_20":662,"TIME_24":34,"ON_OFF_SE":"승차","TIME_18":1067,"TIME_17":1005,"TIME_SM":13513,"TIME_19":962,"TIME_10":450,"LINE_NM":"6호선","TIME_12":645,"TIME_11":583,"TIME_14":699,"TIME_13":806,"TIME_16":990,"TIME_15":817},
        {"STAT_NM":"연신내(6)2","INCOME_DATE":"20140808","TIME_09":739,"TIME_08":782,"TIME_07":295,"TIME_06":161,"TIME_05":21,"TIME_23":434,"TIME_22":680,"TIME_21":660,"TIME_20":760,"TIME_24":198,"ON_OFF_SE":"하차","TIME_18":1332,"TIME_17":999,"TIME_SM":12740,"TIME_19":1481,"TIME_10":532,"LINE_NM":"6호선","TIME_12":691,"TIME_11":421,"TIME_14":547,"TIME_13":582,"TIME_16":843,"TIME_15":582},
        {"STAT_NM":"월곡1","INCOME_DATE":"20140808","TIME_09":873,"TIME_08":1875,"TIME_07":1688,"TIME_06":485,"TIME_05":236,"TIME_23":187,"TIME_22":316,"TIME_21":375,"TIME_20":400,"TIME_24":43,"ON_OFF_SE":"승차","TIME_18":1079,"TIME_17":713,"TIME_SM":13036,"TIME_19":650,"TIME_10":622,"LINE_NM":"6호선","TIME_12":584,"TIME_11":583,"TIME_14":572,"TIME_13":575,"TIME_16":657,"TIME_15":523},
        {"STAT_NM":"월곡2","INCOME_DATE":"20140808","TIME_09":727,"TIME_08":942,"TIME_07":307,"TIME_06":143,"TIME_05":31,"TIME_23":575,"TIME_22":816,"TIME_21":709,"TIME_20":891,"TIME_24":254,"ON_OFF_SE":"하차","TIME_18":1219,"TIME_17":752,"TIME_SM":12213,"TIME_19":1389,"TIME_10":457,"LINE_NM":"6호선","TIME_12":455,"TIME_11":407,"TIME_14":477,"TIME_13":530,"TIME_16":620,"TIME_15":512},
        {"STAT_NM":"월드컵경기장1","INCOME_DATE":"20140808","TIME_09":273,"TIME_08":456,"TIME_07":412,"TIME_06":150,"TIME_05":44,"TIME_23":354,"TIME_22":423,"TIME_21":404,"TIME_20":512,"TIME_24":56,"ON_OFF_SE":"승차","TIME_18":927,"TIME_17":677,"TIME_SM":8067,"TIME_19":585,"TIME_10":258,"LINE_NM":"6호선","TIME_12":314,"TIME_11":337,"TIME_14":381,"TIME_13":389,"TIME_16":574,"TIME_15":541},
        {"STAT_NM":"월드컵경기장2","INCOME_DATE":"20140808","TIME_09":633,"TIME_08":611,"TIME_07":243,"TIME_06":138,"TIME_05":45,"TIME_23":186,"TIME_22":309,"TIME_21":341,"TIME_20":559,"TIME_24":84,"ON_OFF_SE":"하차","TIME_18":771,"TIME_17":535,"TIME_SM":9117,"TIME_19":809,"TIME_10":406,"LINE_NM":"6호선","TIME_12":519,"TIME_11":453,"TIME_14":639,"TIME_13":602,"TIME_16":605,"TIME_15":629},
        {"STAT_NM":"응암1","INCOME_DATE":"20140808","TIME_09":1500,"TIME_08":3318,"TIME_07":2797,"TIME_06":910,"TIME_05":358,"TIME_23":197,"TIME_22":293,"TIME_21":397,"TIME_20":507,"TIME_24":42,"ON_OFF_SE":"승차","TIME_18":978,"TIME_17":890,"TIME_SM":18612,"TIME_19":761,"TIME_10":883,"LINE_NM":"6호선","TIME_12":821,"TIME_11":823,"TIME_14":731,"TIME_13":874,"TIME_16":792,"TIME_15":740},
        {"STAT_NM":"응암2","INCOME_DATE":"20140808","TIME_09":523,"TIME_08":720,"TIME_07":294,"TIME_06":231,"TIME_05":55,"TIME_23":1048,"TIME_22":1221,"TIME_21":1314,"TIME_20":1674,"TIME_24":535,"ON_OFF_SE":"하차","TIME_18":2034,"TIME_17":1169,"TIME_SM":17588,"TIME_19":2266,"TIME_10":452,"LINE_NM":"6호선","TIME_12":578,"TIME_11":437,"TIME_14":629,"TIME_13":588,"TIME_16":975,"TIME_15":845},
        {"STAT_NM":"이태원1","INCOME_DATE":"20140808","TIME_09":494,"TIME_08":821,"TIME_07":469,"TIME_06":298,"TIME_05":202,"TIME_23":1485,"TIME_22":1855,"TIME_21":1476,"TIME_20":1342,"TIME_24":329,"ON_OFF_SE":"승차","TIME_18":1509,"TIME_17":1120,"TIME_SM":17746,"TIME_19":1312,"TIME_10":393,"LINE_NM":"6호선","TIME_12":513,"TIME_11":509,"TIME_14":952,"TIME_13":770,"TIME_16":1006,"TIME_15":891},
        {"STAT_NM":"이태원2","INCOME_DATE":"20140808","TIME_09":959,"TIME_08":1061,"TIME_07":500,"TIME_06":281,"TIME_05":44,"TIME_23":1002,"TIME_22":1311,"TIME_21":1402,"TIME_20":1873,"TIME_24":697,"ON_OFF_SE":"하차","TIME_18":2394,"TIME_17":1623,"TIME_SM":23178,"TIME_19":3170,"TIME_10":737,"LINE_NM":"6호선","TIME_12":1102,"TIME_11":866,"TIME_14":1025,"TIME_13":1018,"TIME_16":1148,"TIME_15":965},
        {"STAT_NM":"천호(8)1","INCOME_DATE":"20140101","TIME_09":487,"TIME_08":400,"TIME_07":297,"TIME_06":378,"TIME_05":289,"TIME_23":280,"TIME_22":502,"TIME_21":571,"TIME_20":592,"TIME_24":0,"ON_OFF_SE":"승차","TIME_18":805,"TIME_17":828,"TIME_SM":10714,"TIME_19":608,"TIME_10":464,"LINE_NM":"8호선","TIME_12":656,"TIME_11":533,"TIME_14":690,"TIME_13":708,"TIME_16":782,"TIME_15":844},
        {"STAT_NM":"천호(8)2","INCOME_DATE":"20140101","TIME_09":405,"TIME_08":246,"TIME_07":197,"TIME_06":225,"TIME_05":39,"TIME_23":422,"TIME_22":615,"TIME_21":543,"TIME_20":647,"TIME_24":57,"ON_OFF_SE":"하차","TIME_18":983,"TIME_17":1073,"TIME_SM":11333,"TIME_19":914,"TIME_10":315,"LINE_NM":"8호선","TIME_12":544,"TIME_11":491,"TIME_14":887,"TIME_13":820,"TIME_16":1017,"TIME_15":893}
    ]
}

class TrialVersion extends React.Component{

    constructor(props){
        super(props);
        this.changeState=this.changeState.bind(this);
        this.state = {
            keys : [],
            chartType: ''
        }
    }
    changeState(state){
        this.setState({keys:state});
    }
    changeChartType(chartName) {
        console.log("selected Chart Name: ", chartName);
        this.setState({chartType: chartName});
    }
    render(){
        let jsonKeys = [];
        $.each(jsonObject.DATA[0], (key, value)=>{
            jsonKeys.push(key);
        });
        return(
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                  <LeftArea menuItem={jsonKeys} changeState={this.changeState}/>
                </MuiThemeProvider>
                <div className="chartSelectButton"><ChartSelect selectChart={this.changeChartType.bind(this)}/></div>
                <CenterArea keys={this.state.keys} chartType={this.state.chartType} data={jsonObject.DATA}/>

            </div>
        );
    }
}

export default TrialVersion;