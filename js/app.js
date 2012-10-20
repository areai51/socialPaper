/**************************
* Application
**************************/
App = Em.Application.create();

/**************************
* Models
**************************/
App.Tweet = Em.Object.extend({
    avatar: null,
    screen_name: null,
    text: null,
    date: null
});


/**************************
* Views
**************************/






/**************************
* Controllers
**************************/
App.tweetsController = Em.ArrayController.create({
    content: [],
     username: 'areai51',
    loadTweets: function( url,x) {



        var me = this;
        var username = me.get("username");
        if ( username ) {
           
var url =url;


//---------- Twitter Parsers-----

String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
        return url.link(url);
    });
};
String.prototype.parseUsername = function() {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        var username = u.replace("@","")
        return u.link("http://twitter.com/"+username);
    });
};
String.prototype.parseHashtag = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
        var tag = t.replace("#","%23")
        return t.link("http://search.twitter.com/search?q="+tag);
    });
};
function parseDate(str) {
    var v=str.split(' ');
    return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
}


//----------Twitter Parsers Over -----------------------

                      

			$.getJSON(url,function(data){
			    me.set('content', []);
			    $(data).each(function(index,value){
var tweet = value.text;
tweet = tweet.parseURL().parseUsername().parseHashtag();

			        var t = App.Tweet.create({
			            avatar: value.user.profile_image_url,
			            screen_name: value.user.screen_name,
			          //  text: value.text,
			            text: tweet,
                 
                  name:value.user.name,

                  date: value.created_at

			        });
            
              me.pushObject(t);
			       
			    })
			});
        }
    }
});

App.ListController = Em.ArrayController.create({
content:[],

loadList: function (event){
   var x=event.target.id;
  // a => List Name  b=> User Handle
var a ='';
var b='';
switch(x)
{
case 'design':
  a='top-design-blogs';
  b='behoff';

  break;
case 'funny':
 a='top-50-funny';
  b='Favstar';
 
  break;
case 'Cloud':
a='web-hosting-and-cloud';
b='Scobleizer';
break;

case 'Java':
a='java-dev';
b='nalaj';

case 'Magento':
a='magento-community';
b='sweettooth';
break;

case 'RoR':
a='rubyists';
b='nk';
break;

case 'Programming':
a='news-hackers'
b='harrisj'
break;

case 'Bangalore':
a='bangalore-forums';
b='arunram';
break;
case 'Pune':
a='Pune';
b='IndianGuru';
break;

case 'Neevites':
a='Neevites';
b='areai51';
break;


default:

}



var url= 'https://api.twitter.com/1/lists/statuses.json?slug='+a+'&owner_screen_name='+b+'&per_page=100&page=1&include_entities=true&callback=?';
 
     App.tweetsController.loadTweets(url,x);
      
this.set('vSection', x);
}

})


// Loading a Default List 
 App.tweetsController.loadTweets('https://api.twitter.com/1/lists/statuses.json?slug=Neevites&owner_screen_name=Areai51&per_page=100&page=1&include_entities=true&callback=?','Design');
