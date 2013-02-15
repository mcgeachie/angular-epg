mockRecEngine = angular.module('mockRecEngine', ['fangApp', 'ngMockE2E']);
mockRecEngine.run(function($httpBackend) {

	var recommendations = [
		{channelId:3811,eventId:254,crid:31663,startTime:"1361209500000",img:"http://epgstatic.sky.com/epgdata/1.0/paimage/18/0/webANXplaceinsun.jpg",title:"A Place in the Sun: Home or Away",channelName:"More4 HD",synopsis:"Jonnie Irwin and Jasmine Harman help Ann and her nephew Craig find the perfect buy-to-let investment. Ann favours a property in Edinburgh, while Craig is keen on Bratislava in Slovakia."},
		{channelId:4052,eventId:943,crid:342901,startTime:"1361295000000",img:"http://epgstatic.sky.com/epgdata/1.0/paimage/18/0/webANXhugo2011a.jpg",title:"Hugo 3D",channelName:"Sky 3D",synopsis:"Martin Scorsese directs this Oscar-winning family adventure starring Asa Butterfield as a Parisian orphan on a quest to repair his late father's automaton. (2011)(121 mins) (3D TV required)"},
		{channelId:6532,eventId:242,crid:62227,startTime:"1361028000000",img:"http://epgstatic.sky.com/epgdata/1.0/paimage/18/0/webANXgarfield04.jpg",title:"Garfield",channelName:"ITV2 HD",synopsis:"Family comedy starring Breckin Meyer and Jennifer Love Hewitt, 2004. The cartoon cat is on hand to save the day when Odie the dancing pooch is stolen by a devious TV host."},
		{channelId:4023,eventId:180,crid:279443,startTime:"1361016000000",img:"http://epgstatic.sky.com/epgdata/1.0/paimage/18/0/webBurnNotice4Ep3.jpg",title:"Burn Notice",channelName:"FOX HD",synopsis:"Fast Friends: Michael convinces Vaughn to let him take care of Jesse Porter - the spy he recently burned - but he needs to find him first."},
		{channelId:4052,eventId:84,crid:317103,startTime:"1361304000000",img:"http://epgstatic.sky.com/epgdata/1.0/paimage/18/0/webANXspykids4.jpg",title:"Spy Kids 4: All The Time In The...",channelName:"Sky 3D",synopsis:"... World 3D: Super-spy Jessica Alba takes her new stepchildren under her wing as they take on the evil Timekeeper. Family comedy. (2011)(85 mins) (3D TV required)"},
		{channelId:3358,eventId:670,crid:90813,startTime:"1361294400000",img:"http://epgstatic.sky.com/epgdata/1.0/paimage/18/0/webHolbyCitylogo.jpg",title:"Holby City",channelName:"Sony TV",synopsis:"Pants On Fire: Joseph is suspicious when Faye rushes off to the police station to get her ex-husband's exhumation results. The heat turns as Donna gets her claws into Michael."}
	];
	 
	$httpBackend.whenGET(/^\/api\/1.0\/personalised\/101\/epg\/session\/0/).respond(recommendations);
	$httpBackend.whenGET(/^templates\//).passThrough();
	$httpBackend.whenGET(/^views\//).passThrough();
});