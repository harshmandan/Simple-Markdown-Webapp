const express = require('express');
const bodyParser = require("body-parser");
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
	let text = req.body.mytext;
	//mid = text.toString();
	markup = text.split(' ');
	//console.log(markup);
	var bol=0, und=0, big=0, si=0;
	for (var index = 0; index < markup.length ; index++) {
  		if(markup[index].includes("*"))
  		{
  			if(bol>0)
  			{
  				markup[index] =markup[index].replace("*", " </b>");
  				bol--;
  			}
  			else
  			{
  				markup[index] = markup[index].replace("*", " <b>");
  				bol++;
  				if(markup[index].includes("*"))
  				{
  					markup[index] = markup[index].replace("*", " </b>");
  					bol--;
  				}
  			}
  		}

  		if(markup[index].includes("_"))
  		{
  			if(und>0)
  			{
  				markup[index] =markup[index].replace("_", " </ins>");
  				und--;
  			}
  			else
  			{
  				markup[index] = markup[index].replace("_", " <ins>");
  				und++;
  				if(markup[index].includes("_"))
  				{
  					markup[index] = markup[index].replace("_", " </ins>");
  					und--;
  				}
  			}
  		}

  		if(markup[index].includes("^"))
  		{
  			if(big>0)
  			{
  				markup[index] =markup[index].replace("^", " </big></big>");
  				big--;
  			}
  			else
  			{
  				markup[index] = markup[index].replace("^", " <big><big>");
  				big++;
  				if(markup[index].includes("^"))
  				{
  					markup[index] = markup[index].replace("^", " </big></big>");
  					big--;
  				}
  			}
  		}

  		if(markup[index].includes("[") || markup[index].includes("]"))
  		{
  			if(markup[index].includes("["))
  			{
  				si=index;
  				//markup[index] =markup[index].replace("[", "");
  			}
  			if(markup[index].includes("]"))
  			{
  				var link=markup[index].substring(markup[index].lastIndexOf("(")+1,markup[index].lastIndexOf(")"));
  				markup[index] = markup[index].replace("("+link+")", "");
  				markup[index] = markup[index].replace("]", " </a>");
  				var linktext = markup[si].substring(markup[si][0],markup[si].lastIndexOf("["));
  				markup[si] = markup[si].replace(linktext+"[", "");
  				markup.splice(si, 0, linktext+ " <a"+" "+"href="+link+"> ");
  			}
  		}

  		if(markup[index].includes("\n"))
  		{
  			markup[index] = markup[index].replace(/(\r\n)/g, " <br>");
  		}
	}
	newmarkup = (markup.join(" ")).split(new RegExp('(?<=[.?])( +|\Z)', 'g'));
	//console.log("SENDING:::::")
	//console.log(newmarkup);
	res.render('markup', {newmarkup, newmarkup, error: null});
})

app.listen(3000, function () {
  console.log('Markup app listening on port 3000!')
})