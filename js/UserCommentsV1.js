/*******************************************
20101118 SDZ: Modified
20110623 SDZ: Modified
*******************************************/
var GUserCommentsIE;	
var GUserCommentsAjaxReq      		= null;
var GUserCommentsAjaxDoc     		  = null;
var GUserCommentsWhat  				 		= null;
var GUserCommentsUrl 							= null;
var GUserCommentsAjaxDiv         	= null;
var GUserCommentsForm       			= null;
var GUserCommentsSubmitParams 		= null;
  
if ((document.all) && (navigator.userAgent.indexOf('Opera')== -1)) {
	GUserCommentsIE = true;
} else {
	GUserCommentsIE = false;
}
function DeleteCookie(AName){
	document.cookie = AName+ "=" +escape("")+ ";expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;";
} 
function GetCookie(AName)
{
	if (document.cookie.length>0)
  {
		c_start=document.cookie.indexOf(AName + "=");
		if (c_start!=-1)
		{ 
			c_start=c_start + AName.length+1; 
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
		} 
  }
  return "";
}

function SetCookie(AName,AValue,ADays)
{
	var exdate=new Date();
	//exdate.setDate(exdate.getDate()+ADays);
	exdate.setTime(exdate.getTime()+(ADays*60*1000));
	document.cookie=AName+ "=" +escape(AValue)+ ((ADays==null) ? "" : ";expires="+exdate.toGMTString()+";path=/;");
}

function MeComment(AInfo)
{
	LCommentInfo=GetCookie('MeComment');
	
	if (LCommentInfo == null || LCommentInfo=="")
		SetCookie('MeComment',AInfo,1440);
}
function MeActivity(AInfo)
{
	LMeActivity=GetCookie('MeActivity');
	
	if (LMeActivity == null || LMeActivity=="")
		SetCookie('MeActivity',AInfo,45);
}
function createRequestObject()
{
	if (window.XMLHttpRequest)
	{
		return xmlhttprequest = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{ 
		return xmlhttprequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
}


	
  
function UserCommentsNewRequest() {
	if (GUserCommentsIE == true)  {
		return new ActiveXObject("Microsoft.XMLHTTP");    
	} else {
		return new XMLHttpRequest();
	}
}

function UserCommentsProcessAjax() {
	if ((GUserCommentsAjaxReq.readyState == 4) && ((GUserCommentsAjaxReq.status == 200) || (GUserCommentsAjaxReq.status == 404))) {
		GUserCommentsAjaxDoc = GUserCommentsAjaxReq.responseText;
		GUserCommentsAjaxDiv.innerHTML = GUserCommentsAjaxDoc;
		if(GUserCommentsForm != null){
			UserCommentsDoDelay(2000);
		  document.getElementById(GUserCommentsForm + 'progress').style.visibility = "hidden";
		  LStr = window.location.href;
		  LStr = LStr.replace(/.Comments/i, "");
		  window.location.href = LStr + "#Comments";
		}
	}
	
}

function UserCommentsSubmit() {
	try {
		GUserCommentsAjaxReq = UserCommentsNewRequest();
		GUserCommentsAjaxReq.onreadystatechange = UserCommentsProcessAjax;
		
		GUserCommentsAjaxReq.open("POST", GUserCommentsUrl, true);
		GUserCommentsAjaxReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=ISO-8859-1;");
		GUserCommentsAjaxReq.setRequestHeader("Content-length", GUserCommentsSubmitParams.length);
		GUserCommentsAjaxReq.setRequestHeader("Connection", "close");
		GUserCommentsAjaxReq.send(GUserCommentsSubmitParams);
	} catch(e) {
		alert(e);  
	}  
}
  
function UserCommentsProcessCommmentForm() {	
	LFormErrors      = true;
	LForm           = document.getElementById(GUserCommentsForm);
	var LGetStr = '';
	
	for (i=0; i<LForm.childNodes.length; i++) {
		 if (LForm.childNodes[i].tagName == "INPUT"){
				if (LForm.childNodes[i].type == "text") {
					 LGetStr += LForm.childNodes[i].name + "=" + escape(LForm.childNodes[i].value) + "&";
				}
				if (LForm.childNodes[i].type == "checkbox") {
					 if (LForm.childNodes[i].checked) {
							LGetStr += LForm.childNodes[i].name + "=" + LForm.childNodes[i].value + "&";
					 } else {
							LGetStr += LForm.childNodes[i].name + "=&";
					 }
				}
				if (LForm.childNodes[i].type == "radio") {
					 if (LForm.childNodes[i].checked) {
							LGetStr += LForm.childNodes[i].name + "=" + LForm.childNodes[i].value + "&";
					 }
				}
		 }
		 
		 if (LForm.childNodes[i].tagName == "TEXTAREA"){
			 LGetStr += LForm.childNodes[i].name + "=" + escape(LForm.childNodes[i].value) + "&";       
		 }
		 
		 if (LForm.childNodes[i].tagName == "SELECT") {
				var LSel = LForm.childNodes[i];
				LGetStr += LSel.name + "=" + LSel.options[sel.selectedIndex].value + "&";
		 }
		 
		 if (LForm.childNodes[i].type == "hidden") {
			 LGetStr += LForm.childNodes[i].name + "=" + LForm.childNodes[i].value + "&";       
		 }
	}
	
	LGetStr = LGetStr + "Title=" + document.location.href + "&";
	GUserCommentsSubmitParams = LGetStr;
	GUserCommentsAjaxReq = null;
	UserCommentsSubmit();
}

function UserCommentsProcessRequest(ADivTag) {
	try {    
		GUserCommentsAjaxDiv = document.getElementById(ADivTag);     
		GUserCommentsAjaxDiv.innerHTML  = '<center> <img align="center" src="/graphics/progress.gif" border="0" alt="Loading, please wait..." /></center> ';
		GUserCommentsAjaxReq                    = UserCommentsNewRequest();
		GUserCommentsAjaxReq.onreadystatechange = UserCommentsProcessAjax;
		GUserCommentsAjaxReq.open("GET", GUserCommentsUrl, true);
		GUserCommentsAjaxReq.send(null);
	} catch(e) {
		alert(e);  
	}  
}


// Used to submit content 
function UserCommentsSubmitComment(AFormId,AUrl,ANew){
  GUserCommentsForm = AFormId;
  GUserCommentsUrl = AUrl + "&omniture=0";
  
  document.getElementById(AFormId + 'progress').style.visibility = "visible" 
  GUserCommentsWhat = 1;
  UserCommentsProcessCommmentForm();
}

// Used to get content
function UserCommentsGetIt(ADivTag,AAction){
  GUserCommentsUrl        = AAction;
  UserCommentsProcessRequest(ADivTag);
}

function UserCommentsDoDelay(AAmount) { 
   LD = new Date(); //today's date 
   while (1) { 
     LMill = new Date(); // Date Now 
     LDiff = LMill-LD; //difference in milliseconds 
     if( LDiff > AAmount ) { 
       break; 
     } 
   } 
}

