# hljs-themes

Scoped themes for highlightjs

###Installation

    bower install hljs-themes --save

###Typical theme
		
	 //typical-theme.scss
     .hljs {
       ...These styles override all other themes
     }

###Scoped theme

	 //scoped-theme.scss
     .my-theme {
       .hljs {
          ...Now I can easily switch between themes or create a 
          resuable component where a theme can passed as a parameter
       }
     }
     
     
     
###Use Case

     {{#themed-syntax lang="handlebars" theme="github-gist"}}
       {{!code}}
     {{/themed-syntax}}

<http://demos.evolutionaryapps.com/EmberThemedSyntax>


###Please Contribute

To contribute, [fork](https://github.com/crodriguez1a/hljs-themes) this branch and provide your theme **scoped to a corresponding namespace**. Also, please provide a `transparent` class for users who want to opt-out from using a background color. This project uses **SCSS**, but please compile and provide **SCSS**, **CSS**, and **minified CSS** file as well. Thanks!
	
	//my-custom-hljs-theme.scss
    .my-custom-hljs-theme {
      &.transparent  {
        .hljs {
          background: none;
        }
      }
      
      .hljs {
        //...
