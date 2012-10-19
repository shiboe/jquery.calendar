/*
 * jQuery Calendar - http://shiboe.com/jquery/calendar/
 * 
 * Build a date accurate traversable calendar within a given container
 * 
 * Copyright © 2008 Stephen Cave - sccave@gmail.com
 * All rights reserved.
 * 
 */

(function( $ ){

  var methods = {
     init : function( options ) {
         
        var settings = $.extend( {
            'timestamp' : false,
            'monthYear' : false
        }, options);


       return this.each(function(){
           
           var today = new Date();
           
           var month = today.getMonth();
           var year = today.getFullYear();
           
           if(settings.timestamp !== false){
               
               var date = new Date( settings.timestamp );
               month = date.getMonth();
               year = date.getFullYear();
           }
           else if(settings.monthYear !== false){
               
               month = settings.monthYear[0];
               year = settings.monthYear[1];
           }
           
           var data = $(this).data("calendar");
           if( !data ){
               
               $(this).data('calendar',{
                   year: year,
                   month: month
               });
           }
           
           var calendar = buildCalendar( month, year );
           
           $(this).html(calendar);
       });

     },
     destroy : function( ) {

       return this.each(function(){
         $(this).removeData("calendar").children(".calendar").remove();
       })
     },
     previous : function() {
         
         var month = $(this).data("calendar").month;
         var year = $(this).data("calendar").year;
         
         if( month > 0)month--;
         else{
             
             year--;
             month = 11;
         }
         
         var newCalendar = buildCalendar( month, year );
         $(this).html(newCalendar);
         
         $(this).data("calendar").month = month;
         $(this).data("calendar").year = year;
     },
     next : function() {
         
         var month = $(this).data("calendar").month;
         var year = $(this).data("calendar").year;
         
         if( month < 11)month++;
         else{
             
             year++;
             month = 0;
         }
         
         var newCalendar = buildCalendar( month, year );
         $(this).html(newCalendar);
         
         $(this).data("calendar").month = month;
         $(this).data("calendar").year = year;
     }
  };

  $.fn.calendar = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.calendar' );
    }    
  
  };
  
  function isLeap( year ){
      
    if(year%4 == 0) {
        if(year%100 == 0) {
            if(year%400 == 0)return true;
            else return false;
        }
        else return true;
    }
    return false;
  }
  
  function buildCalendar( month, year ){
      
    var days = "";
    
    var preDays = new Date(year,month,1);
    var numPreDays = preDays.getDay();
    preDays.setDate(0);
    preDays = preDays.getDate();
    
    for(var i=numPreDays; i > 0; i--)days += html.day( (preDays-i), {CLASS:["priorMonth"]} ); 
    
    var today = new Date();
    today = ( today.getMonth() === month && today.getFullYear() === year ) ? today.getDate() : 32;
    
    var numDays = ( month === 1 && isLeap(year) ) ? 29 : daysIn[month];
    for(var i=1; i<=numDays; i++)
    {
        var classes = [];
        if( today === i )classes.push("today");
        if( i > today )classes.push("future");
        days += html.day( i, {ID:"day_"+year+month+i, CLASS:classes} );
    }
    
    return html.calendar(year, months[month], days);
  }
  
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var daysIn = [31,28,31,30,31,30,31,31,30,31,30,31];
  
  var html = {
      day : function( day, identifiers ){var ID = identifiers.ID ? ("id='"+identifiers.ID+"'") : "";var CLASS = identifiers.CLASS ? ( " "+identifiers.CLASS.join(" ") ) : "";return "<div "+ID+" class='day"+CLASS+"'>"+day+"</div>";},
      calendar : function( year, month, days ){return "<h2 class='month'>"+month+"</h2><h3 class='year'>"+year+"</h3><div class='days'>"+days+"</div><div style='clear:both;'></div>";}
  };

})( jQuery );