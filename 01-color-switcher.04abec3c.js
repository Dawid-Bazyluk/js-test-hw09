!function(){var e,t=document.querySelector("body"),d=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");a.disabled=!0,d.addEventListener("click",(function(){d.disabled=!0,a.disabled=!1,e=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),a.addEventListener("click",(function(){d.disabled=!1,a.disabled=!0,clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.04abec3c.js.map