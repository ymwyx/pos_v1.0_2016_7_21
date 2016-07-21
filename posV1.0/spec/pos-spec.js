'use strict';

describe("formatTags",function () {
    it("getObjectList",function () {
        let barcode=["ITEM002-2"];
        let formattedTags=formatTags(barcode);
        expect(formattedTags).toEqual([{barcode:"ITEM002",amount:'2'}]);
    })
})


describe("mergeBarcodes",function () {
    it("getNoRepeatList",function () {
        let formattedTags=[{barcode:"ITEM002",amount:2},{barcode:"ITEM002",amount:2}];
        let amountBarList= mergeBarcodes(formattedTags);
        expect(amountBarList).toEqual([{barcode:"ITEM002",amount:4}]);
    })
})



describe("getPromotionsTypeItems",function () {
    it("getPromotionsTypeItems",function () {
        let amountBarList=[{barcode:"ITEM002",amount:2}];
        let promotionsList=[{type: 'BUY_TWO_GET_ONE_FREE',barcodes:["ITEM002","ITEM003"]}]
        let cartPromotionsList= getPromotionsTypeItems(amountBarList,promotionsList);
        expect(cartPromotionsList).toEqual([{barcode:"ITEM002",amount:2,type:'BUY_TWO_GET_ONE_FREE'}]);
    })
})


describe("getCartItems",function () {
    it("getCartItems",function () {
        let cartPromotionsList=[{barcode:"ITEM002",amount:2,type:'BUY_TWO_GET_ONE_FREE'}];
        let allItemsList=[{ barcode: 'ITEM002',name: '苹果',unit: '斤',price: 5.50}]
        let cartItemsList= getCartItems(cartPromotionsList,allItemsList);
        expect(cartItemsList).toEqual([{barcode:"ITEM002",amount:2,type:'BUY_TWO_GET_ONE_FREE',name: '苹果',unit: '斤',price: 5.50}]);
    })
})



describe("calSaving",function () {
    it("calSaving",function () {
        let cartItemsList=[{barcode:"ITEM002",amount:4,type:'BUY_TWO_GET_ONE_FREE',name: '苹果',unit: '斤',price: 5.50}];
        let savingList= calSaving(cartItemsList)
        expect(savingList).toEqual([{barcode:"ITEM002",amount:4,type:'BUY_TWO_GET_ONE_FREE',name: '苹果',unit: '斤',price: 5.50,saving:5.50}]);
    })
})


describe("calSubtotal",function () {
    it("calSubtotal",function () {                                                                     
        let savingList=[{barcode:"ITEM002",amount:4,type:'BUY_TWO_GET_ONE_FREE',name: '苹果',unit: '斤',price: 5.50,saving:5.50}];
        let subtotalList=calSubtotal(savingList)
        expect(savingList).toEqual([{barcode:"ITEM002",amount:4,type:'BUY_TWO_GET_ONE_FREE',name: '苹果',unit: '斤',price: 5.50,saving:5.50,subtotal:16.5}]);
    })                                                                                                                                         
})



describe("calSumSaving",function () {
    it("calSumSaving",function () {
        let subtotalList=[{barcode:"ITEM002",amount:4,type:'BUY_TWO_GET_ONE_FREE',name: '苹果',unit: '斤',price: 5.50,saving:5.50,subtotal:16.5},
            {barcode:"ITEM001",amount:2,type:'',name: '雪碧',unit: '瓶',price: 3,saving:0,subtotal:6}
        ];
        let sumSaving=calSumSaving(subtotalList);
        expect(sumSaving).toEqual(5.5);
    })
})


describe("calTotal",function () {                                                                       
    it("calTotal",function () {                                                                         
        let subtotalList=[{barcode:"ITEM002",amount:4,type:'BUY_TWO_GET_ONE_FREE',name: '苹果',unit: '斤',price:5.50,saving:5.50,subtotal:16.5}, 
                {barcode:"ITEM001",amount:2,type:'',name: '雪碧',unit: '瓶',price: 3,saving:0,subtotal:6}   
        ];                                                                                
        let totalNum=calTotal(subtotalList);                                        
        expect(totalNum).toEqual(22.5);                                                   
    })                                                                                    
})                                                                                        