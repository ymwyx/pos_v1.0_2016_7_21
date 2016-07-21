'use strict';

let tags=[
    'ITEM000',
    'ITEM001',
    'ITEM001',
    'ITEM001',
    'ITEM001',
    'ITEM003-2',
    'ITEM005',
    'ITEM005',
    'ITEM005'];



function formatTags(tags) {
    return tags.map(function (tag) {
        let arr=tag.split("-");
        return arr.length===2?{
            barcode:arr[0],amount:arr[1]}:
        {
            barcode:arr[0],amount:1
        }
    });
}

function mergeBarcodes(formattedTags) {
    let amountBarList=[];
    for (let i=0;i<formattedTags.length;i++){
        let exsit=amountBarList.find(function (item) {
            return item.barcode===formattedTags[i].barcode;
        })
        if (!exsit){
            amountBarList.push(formattedTags[i])
        }
        else {
            exsit.amount=parseFloat(formattedTags[i].amount)+parseFloat(exsit.amount);
        }
    }
    return amountBarList;

}
let promotionsList=loadPromotions();
let allItemsList=loadAllItems();

function getPromotionsTypeItems(amountBarList,promotionsList) {
    let cartPromotionsList=[];
    for (let i=0;i<amountBarList.length;i++){
        cartPromotionsList.push(amountBarList[i]);
        cartPromotionsList[i].type='';
    }
    for (let i=0;i<cartPromotionsList.length;i++){
        for (let j=0;j<promotionsList.length;j++){
            for (let k=0;k<promotionsList[j].barcodes.length;k++)
            {
                if(cartPromotionsList[i].barcode === promotionsList[j].barcodes[k]){
                    cartPromotionsList[i].type=promotionsList[j].type;
                }
            }
        }
    }
    return cartPromotionsList;
}

function getCartItems(cartPromotionsList,allItemsList) {
    let cartItemsList=[];

    for (let k=0;k<cartPromotionsList.length;k++){
        cartItemsList.push(cartPromotionsList[k]);
    }

    for(let i=0;i<cartItemsList.length;i++){
        for (let j=0;j<allItemsList.length;j++){
            if (cartItemsList[i].barcode === allItemsList[j].barcode){
                cartItemsList[i].name=allItemsList[j].name;
                cartItemsList[i].price=allItemsList[j].price;
                cartItemsList[i].unit=allItemsList[j].unit;
            }
        }
    }
    return cartItemsList;
}

function calSaving(cartItemsList) {
    let savingList=[];

    for (let i=0;i<cartItemsList.length;i++){
        savingList.push(cartItemsList[i]);
        savingList[i].saving=0;
        if (cartItemsList[i].type==='BUY_TWO_GET_ONE_FREE'){
            let price=parseFloat(savingList[i].price);
            let amount=Math.floor(savingList[i].amount/3);
            savingList[i].saving=parseFloat(price*amount);
        }

    }

    return(savingList);
}

function calSubtotal(savingList) {
    let subtotalList=[];
    for(let i=0;i<savingList.length;i++){
        subtotalList.push(savingList[i]);
        subtotalList[i].subtotal=subtotalList[i].amount*subtotalList[i].price-subtotalList[i].saving;
    }

    return subtotalList;
}

function calSumSaving(subtotalList) {
    let sumSaving=0;
    Number(sumSaving);
    for(let i=0;i<subtotalList.length;i++){
       sumSaving+=Number(subtotalList[i].saving);
    }

    return sumSaving;
}

function calTotal(subtotalList) {
    let totalNum=0;
    Number(totalNum);
    for(let i=0;i<subtotalList.length;i++){
        totalNum+=Number(subtotalList[i].subtotal);
    }

    return totalNum;
}

function print(subtotalList,sumSaving,totalNum) {


        console.log("************小票打印************")
        for (let i=0;i<subtotalList.length;i++){
            console.log("   货号     :"+subtotalList[i].barcode);
            console.log("   数量     :"+subtotalList[i].amount+ subtotalList[i].unit);
            console.log("   名称     :"+subtotalList[i].name);
            console.log("   单价     :"+subtotalList[i].price);
            console.log("   小计     :"+subtotalList[i].subtotal);
            console.log("\n");
        }
        console.log("   总计     :"+totalNum);
        console.log("  共节省了  ："+sumSaving);
        console.log("************小票打印************")


}

function printReceipt(tags) {
    let formattedTags=formatTags(tags);
    let amountBarList=mergeBarcodes(formattedTags);
    let promotionsList=loadPromotions();
    let allItemsList=loadAllItems();
    let cartPromotionsList=getPromotionsTypeItems(amountBarList,promotionsList);
    let cartItemsList= getCartItems(cartPromotionsList,allItemsList);
    let savingList=calSaving(cartItemsList);
    let subtotalList=calSubtotal(savingList);
    console.log(subtotalList);
    let sumSaving=calSumSaving(subtotalList);
    let totalNum=calTotal(subtotalList);
    print(subtotalList,sumSaving,totalNum);
}

printReceipt(tags);