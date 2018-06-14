// 享元模式写法


var Book = function(title, author, genre, pageCount, publisherID, ISBN){//所有书所共有的
   this.title = title;
   this.author = author;
   this.genre = genre;
   this.pageCount = pageCount;
   this.publisherID = publisherID;
   this.ISBN = ISBN;
};

// 同一ISBN为同一种书，我们设置内部缓存，保证每种书只创建一次，且如果缓存中有返回缓存的，没有则创建



var BookFactory=(function(){
	var exsitingBooks={};
	return {
		createBook:function(title, author, genre,pageCount,publisherID,ISBN){
			var exsitingBooks=exsitingBooks[ISBN];

			if(exsitingBooks){
				return exsitingBooks;
			}else{
				var book=new Book(title, author, genre,pageCount,publisherID,ISBN);
				exsitingBooks[ISBN]=book;


				return book;
			}
		}
	}
})()



// 外部记录管理



/*BookRecordManager 借书管理类 单例*/
var BookRecordManager = (function(){
   var bookRecordDatabase = {};
   return{
       /*添加借书记录*/
       addBookRecord: function(id, title, author, genre,pageCount,publisherID,ISBN, checkoutDate, checkoutMember, dueReturnDate, availability){
           var book = bookFactory.createBook(title, author, genre,pageCount,publisherID,ISBN);
            bookRecordDatabase[id] ={
               checkoutMember: checkoutMember,
               checkoutDate: checkoutDate,
               dueReturnDate: dueReturnDate,
               availability: availability,
               book: book;

           };
       },
    updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember,     newReturnDate){
        var record = bookRecordDatabase[bookID];
        record.availability = newStatus;
        record.checkoutDate = checkoutDate;
        record.checkoutMember = checkoutMember;
        record.dueReturnDate = newReturnDate;
   },
   extendCheckoutPeriod: function(bookID, newReturnDate){
       bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
   },
   isPastDue: function(bookID){
       var currentDate = new Date();
       return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
   }
 };
});