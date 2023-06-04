var mysql = require('mysql');
const { OK } = require('sqlite3');
var pool = mysql.createPool({
  connectionLimit: 10, //設定連線池大小
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'topic',
  port: '3306'
});

/*A：查詢資料表哪列？
B：來自哪個資料表？
C：篩選條件？*/
function call(A, B, C) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT ${A} FROM ${B} WHERE ${C}`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
}

//測試用數值
var Budget = 10000; //預算金額
var usage = 'work'; //需求
var case1 = 'Montech Air 1000 LITE (黑)';//機殼
async function formula (){
  var need;
  var need1; 
  var j = 1;//升級輪數
  var cpuend1;
  var mbend1;
  var cpucoolerend1;
  var gpuend1;
  var psuend1;
  var ramend1;
  var ssdend1;
  var hddend1;

  const result4 = await call('*','case1','name ='+ '"' + case1 + '"');//搜尋機殼大小
    var case1size = result4[0].MBsize;//尺寸
    var case1VGAlength = result4[0].VGAlength;//長度
    var case1price = result4[0].price;//金額
    console.log('主機板可用大小:',case1size);

  const result1 = await call('*','use1','need ='+ '"' + usage + '"');
    var cpu = parseInt(result1[0].cpu);
    var mb = parseInt(result1[0].mb);
    var cpucooler = parseInt(result1[0].cpucooler);
    var gpu = parseInt(result1[0].gpu);
    var psu = parseInt(result1[0].psu);
    var ram = parseInt(result1[0].ram);
    var ssd = parseInt(result1[0].ssd);
    var hdd = parseInt(result1[0].hdd);
    var pricevalue = parseInt(result1[0].price);
    var need2 = ['null','cpu','mb','cpucooler','gpu','psu','ram','ssd','hdd'];
    var aatest2 = ['null',cpuend1,mbend1,cpucoolerend1,gpuend1,psuend1,ramend1,ssdend1,hddend1]//金額

    var Budget1 = Budget - case1price;//扣除主機金額
    
  if(Budget1>pricevalue){

    switch (usage) {//第一個null不會使用到
      case 'work':      
        need = ["null","cpu","mb","cpucooler","null","null","null","ssd","hdd"];//表單名稱
        need1 = ['null',cpu,mb,cpucooler,gpu,psu,ram,ssd,hdd];//表單基本ID
        break;
      case 'game':
        need = ["null","cpu","mb","cpucooler","gpu","psu","null","ssd","hdd"];
        need1 = ['null',cpu,mb,cpucooler,gpu,psu,ram,ssd,hdd];
        break;
      case 'clip':
        need = ["null","cpu","mb","cpucooler","gpu","psu","ram","ssd","hdd"];
        need1 = ['null',cpu,mb,cpucooler,gpu,psu,ram,ssd,hdd];
      break;
  }
    for(i=0;Budget1>0;i++){
      if (i==9){
        i = 0;
        j++;
      }else if(need1[i] == 0){//ID等於0 or 迴圈數>1 && ID不等於0
        need1[i]++;
      }
      if (need[i] == 'null' && need1[i] == 'null'){
        continue;
      }
      if(need[i] == 'null'){
        var aatest = await call('price',need2[i],'id ='+ ''+need1[i]+'' );//此段為獲取ID價格
        var aatest1 = aatest[0].price;
        aatest2[i] = aatest1
        console.log('迴圈數:',j,'順序:',i,'ID:',need1[i],'名稱',need2[i],'金額 :',aatest2[i]);
        continue;
      }
    switch (i){//此為深及規則
      case 0 ://空值null
      break;
      case 1 ://cpu
      if (Budget1 < 0 || need1[1] == 15){//** */
        var cpuend = await call('*',need[1],'id ='+ ''+need1[1]+'' );//此段為獲取ID價格
        aatest2[1] = cpuend[0].price;
        var cpulabe10 = cpuend[0].label;//***
        var cpucore10 = cpuend[0].core;//***
        console.log('迴圈數:',j,'順序:',1,'ID:',need1[1],'名稱',need[1],'金額 :',aatest2[1],'品牌',cpulabe10,'核心數',cpucore10);
        break;}
        var CPUtest = need1[1]
      if(j>1){
        CPUtest++;
      }
//*********************************************************************************************************************** */
      case 2 ://mb
      if( i == 2 && ((cpulabel == 'intel' && (need1[2] == 35)) || (cpulabel == 'AMD' && (need1[2] == 33) || Budget1 < 0 ))){
        var mbend = await call('*',need[2],'id ='+ ''+need1[2]+'' );//此段為獲取ID價格
        aatest2[2] = mbend[0].price;
        var mbCPUlabel10 = mbend[0].CPUlabel;//***
        var mbpowerede10 = mbend[0].powered;//***
        console.log('迴圈數:',j,'順序:',2,'ID:',need1[2],'名稱',need[2],'金額 :',aatest2[2],'品牌',mbCPUlabel10,'核心數',mbpowerede10);
        break;
      }else{
      var cpumaterial = await call('*',need[1],'id ='+ ''+CPUtest+'' );//獲得cpu資料
      var cpulabel = cpumaterial[0].label;//cpu 廠牌
      var cpucore = cpumaterial[0].core;//cpu 核心數
      var cpuprice = cpumaterial[0].price;//cpu金額
      var mbmaterial = await call('*',need[2],'id ='+ ''+need1[2]+'' );//獲得mb資料
      var mbpowered = mbmaterial[0].powered;//mb 核心
      var mbCPUlabel = mbmaterial[0].CPUlabel;//mb廠牌

        var cpu2 = cpucore/2+2;
        if ( mbpowered <  cpu2 || mbCPUlabel != cpulabel || (cpulabel == 'intel' && (need1[2] == 35)) || (cpulabel == 'AMD' && (need1[2] == 33) || Budget1 < 0 ) ){//如果 尺寸不同 or CPU核心數 > mb核心數 or 廠牌不同
          if(case1size == 'ATX'){
            var mbmaterial2 = await call('MIN(id) AS id',need[2],'CPUlabel = '+'"' + cpulabel+'"'+' AND '+'size = '+'"' + case1size+'"'+' AND '+'powered >= '+ cpu2);//廠牌，尺寸，核心數,價格最低
            need1[2] = mbmaterial2[0].id;
          }else{
            var mbmaterial2 = await call('MIN(id) AS id',need[2],'CPUlabel = '+'"' + cpulabel+'"'+' AND '+'powered >= '+ cpu2);//廠牌，尺寸，核心數,價格最低
            need1[2] = mbmaterial2[0].id;
          }
        }else{
          if(case1size == 'ATX'){
            var mbmaterial2 = await call('MIN(id) AS id',need[2],'CPUlabel = '+'"' + cpulabel+'"'+' AND '+'size = '+'"' + case1size+'"'+' AND '+'powered >= '+ cpu2+' AND '+'id !='+need1[2]+' AND '+'id >'+need1[2]);//廠牌，尺寸，核心數,價格最低
            need1[2] = mbmaterial2[0].id;
          }else{
            var mbmaterial2 = await call('MIN(id) AS id',need[2],'CPUlabel = '+'"' + cpulabel+'"'+' AND '+'powered >= '+ cpu2+' AND '+'id !='+need1[2]+' AND '+'id >'+need1[2]);//廠牌，尺寸，核心數,價格最低
            need1[2] = mbmaterial2[0].id;
          }
        }
      }
//*********************************************************************************************************************** */
        if(i == 1){
          var mbmaterial3 = await call('price',need[2],'id ='+ ''+need1[2]+'' );//獲得mb金額
          var mbprice1 = mbmaterial3[0].price;
          var mbprice2 = Budget1 - ( parseInt(mbprice1) + parseInt(cpuprice) );
          if(j>1 && mbprice2 > 0){//預算>=mb金額
            need1[1] = CPUtest;
          }
          var cpuend = await call('*',need[1],'id ='+ ''+need1[1]+'' );//此段為獲取ID價格
          aatest2[1] = cpuend[0].price;
          var cpulabe10 = cpuend[0].label;//***
          var cpucore10 = cpuend[0].core;//***
          console.log('迴圈數:',j,'順序:',1,'ID:',need1[1],'名稱',need[1],'金額 :',aatest2[1],'品牌',cpulabe10,'核心數',cpucore10);
          break;
        }
//*********************************************************************************************************************** */
        else{
          var mbend = await call('*',need[2],'id ='+ ''+need1[2]+'' );//此段為獲取ID價格
          aatest2[2] = mbend[0].price;
          var mbCPUlabel10 = mbend[0].CPUlabel;//***
          var mbpowerede10 = mbend[0].powered;//***
          console.log('迴圈數:',j,'順序:',2,'ID:',need1[2],'名稱',need[2],'金額 :',aatest2[2],'品牌',mbCPUlabel10,'核心數',mbpowerede10);
          break;
        }
      case 3 ://cpucooler
      if(need1[i] == 6 || Budget1 < 0){
        var cpucoolerend = await call('price',need[3],'id ='+ ''+need1[3]+'' );//此段為獲取ID價格
        aatest2[3] = cpucoolerend[0].price;
        console.log('迴圈數:',j,'順序:',3,'ID:',need1[3],'名稱',need[3],'金額 :',aatest2[3]);
        break;
      }else{
        var cpumaterial = await call('*',need[1],'id ='+ ''+need1[1]+'' );//獲得cpu資料
        var cpucore = cpumaterial[0].core;//cpu 核心數
        var cpucoolermaterial = await call('power',need[3],'id ='+ ''+need1[3]+'' );//獲得cpucooler資料
        var cpucoolerpower = cpucoolermaterial[0].power;//cpucooler 核心數
        if((cpucore<=6 && cpucoolerpower != 4) || (cpucore > 6 && cpucoolerpower != 6)){
          need1[3]=6;
        }else{
          need1[3]++;
        }
    }
      var cpucoolerend = await call('price',need[3],'id ='+ ''+need1[3]+'' );//此段為獲取ID價格
      aatest2[3] = cpucoolerend[0].price;
      console.log('迴圈數:',j,'順序:',3,'ID:',need1[3],'名稱',need[3],'金額 :',aatest2[3]);
      break;

      case 4 ://gpu
      var gpumaterial4 = await call('*',need[4],'id ='+ ''+need1[4]+'' );//獲得Gpu資料
      var gpuprice1 = gpumaterial4[0].price//gpu金額
      var psumaterial3 = await call('*',need[5],'id ='+ ''+need1[5]+'' );//獲得psu資料
      var psuprice2= psumaterial3[0].price//psu金額

      if (Budget1 < 0 || need1[4] == 44 ){
        var gpuend = await call('*',need[4],'id ='+ ''+need1[4]+'' );//此段為獲取ID價格
        aatest2[4] = gpuend[0].price;
        console.log('迴圈數:',j,'順序:',4,'ID:',need1[4],'名稱',need[4],'金額 :',aatest2[4]);
        break;
      }
      var GPUtest2 = need1[4];
      if(j>1){
        var gpumaterial = await call('*',need[4],'id ='+ ''+need1[4]+'' );//獲得Gpu資料
        var gpulength = gpumaterial[0].length;//gpu 長度
        var gpupower1 = gpumaterial[0].power//gpu瓦數
        var psumaterial3 = await call('*',need[5],'id ='+ ''+need1[5]+'' );//獲得psu資料
        var psupower1 = psumaterial3[0].power//psu瓦數

        if(gpulength > case1VGAlength || gpupower1 > psupower1 ){//尺寸比較
          var gpumaterial1 = await call('MIN(id) AS id',need[4],'length <= '+case1VGAlength+' AND '+'power >= '+gpupower1);//獲得長度小於主機板長度並且ID樹為最小並且不可重複
          GPUtest2= gpumaterial1[0].id;
          }else{
            console.log(case1VGAlength);
          var gpumaterial3 = await call('id',need[4],'length <= '+case1VGAlength+' AND '+'power >= '+psupower1+' AND '+'id > '+need1[4]);//獲得長度小於主機板長度並且ID樹為最小並且不可重複
          console.log(need1[4]);
          GPUtest2= gpumaterial3[0].id;
          }
        }
      case 5 ://psu
      if( (i == 5 || i == 4) && (need1[5] == 23 || Budget1 < 0)){
        var psuend = await call('*',need[5],'id ='+ ''+need1[5]+'' );//此段為獲取ID價格
        aatest2[5] = psuend[0].price;
        console.log('迴圈數:',j,'順序:',5,'ID:',need1[5],'名稱',need[5],'金額 :',aatest2[5]);
        var psuid = need1[5];
        break;
      }else{
        var cpumaterial1 = await call('iGPU',need[1],'id ='+ ''+need1[1]+'' );//獲得Cpu資料
        var cpuiGPU = cpumaterial1[0].iGPU;//Cpu 有無內顯
        var gpumaterial2 = await call('*',need[4],'id ='+ ''+GPUtest2+'' );//獲得Gpu資料//******************************有錯誤*/
        var gpupower = gpumaterial2[0].power;//gpu 瓦數
        var gpuprice = gpumaterial2[0].price;//gpu 金額

        var psumaterial = await call('*',need[5],'id ='+ ''+need1[5]+'' );//獲得Psu資料
        var psulength = psumaterial[0].power;//psu瓦數

        if( gpupower1 > psupower1 || gpupower >  psulength && cpuiGPU == 'X' && ((psulength == 650 && need1[4] != 41 ) || (psulength == 750 && need1[4] != 38) || (psulength == 850 && need1[4] != 44))){
          var psumaterial2 = await call('MIN(id) AS id',need[5],'power = '+ gpupower);
          var psuid = psumaterial2[0].id;
        }else if (cpuiGPU == 'X' && parseInt(gpupower) == parseInt(psulength)){
          var psumaterial2 = await call('MIN(id) AS id',need[5],'power >= '+ gpupower+' AND '+'id >'+need1[5]);
          var psuid = psumaterial2[0].id;
        }
      }
//*********************************************************************************************************************** */
        if(i == 4){
          var psumaterial1 = await call('price',need[5],'id ='+ ''+psuid+'' )
          var psuprice1 = psumaterial1[0].price;//psu 金額
          var gpuprice3 = (Budget1 + parseInt(gpuprice1) + parseInt(psuprice2)) - ( parseInt(gpuprice) + parseInt(psuprice1) );
          if(j>1 && gpuprice3 > 0){//預算>=mb金額
            need1[4] = GPUtest2;
            need1[5] = psuid;
          }
          var gpuend = await call('*',need[4],'id ='+ ''+need1[4]+'' );//此段為獲取ID價格
          aatest2[4] = gpuend[0].price;
          var gpupower = gpuend[0].power;//**** */
          console.log('迴圈數:',j,'順序:',4,'ID:',need1[4],'名稱',need[4],'金額 :',aatest2[4],'瓦數',parseInt(gpupower));
          break;
        }
//*********************************************************************************************************************** */
        else {
          var psuend = await call('*',need[5],'id ='+ ''+need1[5]+'' );//此段為獲取ID價格
          aatest2[5] = psuend[0].price;
          var psupower = psuend[0].power;//**** */
          console.log('迴圈數:',j,'順序:',5,'ID:',need1[5],'名稱',need[5],'金額 :',aatest2[5],'瓦數',parseInt(psupower));
          break;
        }
      case 6 ://ram
      var ramremainder = j % 3;
      if(ramremainder !=0 || need1[6] == 23 || Budget1 < 0){
        var ramend = await call('price',need[6],'id ='+ ''+need1[6]+'' );//此段為獲取ID價格
        aatest2[6] = ramend[0].price;
        console.log('迴圈數:',j,'順序:',6,'ID:',need1[6],'名稱',need[6],'金額 :',aatest2[6]);
      }else{
        need1[6]++
        var ramend = await call('price',need[6],'id ='+ ''+need1[6]+'' );//此段為獲取ID價格
        aatest2[6] = ramend[0].price;
        console.log('迴圈數:',j,'順序:',6,'ID:',need1[6],'名稱',need[6],'金額 :',aatest2[6]);
      }
      break;
      case 7 ://ssd
      var ssdremainder = j % 2;
      if(ssdremainder !=0 || need1[7] == 33 || Budget1 < 0){
        var ssdend = await call('price',need[7],'id ='+ ''+need1[7]+'' );//此段為獲取ID價格
        aatest2[7] = ssdend[0].price;
        console.log('迴圈數:',j,'順序:',7,'ID:',need1[7],'名稱',need[7],'金額 :',aatest2[7]);
      }else{
        need1[7]++
        var ssdend = await call('price',need[7],'id ='+ ''+need1[7]+'' );//此段為獲取ID價格
        aatest2[7] = ssdend[0].price;
        console.log('迴圈數:',j,'順序:',7,'ID:',need1[7],'名稱',need[7],'金額 :',aatest2[7]);
      }
      break;
      case 8 ://hdd
      var hddremainder = j % 4;
      if(hddremainder !=0 || need1[8] == 11 || Budget1 < 0){
        var hddend = await call('price',need[8],'id ='+ ''+need1[8]+'' );//此段為獲取ID價格
        aatest2[8] = hddend[0].price;
        console.log('迴圈數:',j,'順序:',8,'ID:',need1[8],'名稱',need[8],'金額 :',aatest2[8]);
      }else{
        need1[8]++
        var hddend = await call('price',need[8],'id ='+ ''+need1[8]+'' );//此段為獲取ID價格
        aatest2[8] = hddend[0].price;
        console.log('迴圈數:',j,'順序:',8,'ID:',need1[8],'名稱',need[8],'金額 :',aatest2[8]);
      }
      break;
      }
      if (i==8){
        console.log( parseInt(aatest2[1]),parseInt(aatest2[2]),parseInt(aatest2[3]),parseInt(aatest2[4]),parseInt(aatest2[5]),parseInt(aatest2[6]),parseInt(aatest2[7]),parseInt(aatest2[8]));
        Budget1 = Budget - ( parseInt(aatest2[1])+parseInt(aatest2[2])+parseInt(aatest2[3])+parseInt(aatest2[4])+parseInt(aatest2[5])+parseInt(aatest2[6])+parseInt(aatest2[7])+parseInt(aatest2[8]));
        console.log('餘額:',Budget1);
      }
    }
  }else{
    console.log('金額不足')
  }
  console.log('end');
  //此位置為顯示金額

}

formula();