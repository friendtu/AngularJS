describe("MainCtrl server calls",function(){
    beforeEach(module('serverApp'));
    var ctrl,mockBackend;

    beforeEach(inject(function($controller,$httpBackend){
        mockBackend=$httpBackend;
        mockBackend.expectGET('/api/note')
            .respond(201,[{id:1,label:'Mock'}]);
         ctrl=$controller('MainCtrl');
    }));

    it('Should load items from server',function(){
        expect(ctrl.items).toEqual([]);
        mockBackend.flush();
        expect(ctrl.items).toEqual([{id:1,label:'Mock'}]);
    });

    afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation();
        mockBackend.verifyNoOutstandingRequest();
    });


});