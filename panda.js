//import { html, define, children } from 'hybrids';
var html = require('hybrids').html;
var define = require('hybrids').define;
var parent = require('hybrids').parent;
var children = require('hybrids').children;
var property = require('hybrids').property;

var stack = [];

export function toggleItem(host){
  host.expanded = !host.expanded;
}

function getInternalEventTarget(event){
    var result = event.path[0];
    if(!result) throw new Error('No Shadow Event Target');
    return result;
}

function getInternalEventDetailElement(event){
    var target = getInternalEventTarget(event);
    var result = target.parentNode.parentNode.children[2];
    if(!result) throw new Error('No Shadow Event Detail');
    return result;
}

export function beginExpandAnimation(host, event){
    host.contracting = true;
    var detail = getInternalEventDetailElement(event);
    var target = getInternalEventTarget(event);
    if(host.expanded) detail.style.marginBottom = target.offsetHeight+'px';
    else detail.style.marginBottom = 0;
    setTimeout(function(){
        endExpandAnimation(host)
    }, 150);
}

export function endExpandAnimation(host){
    host.contracting = false;
}

export const ExPandaItem = {
  name: property('just a test'),
  expanded: property(false),
  contracting: false,
  extra_classes: ({expanded, contracting}) =>
    ((expanded && 'expanded') || 'contracted')+
    ' '+((contracting && 'trxing') || 'trxed' ),
  bottom: 0,
  host: parent(el => (el === ExPandaList) || (el === ExPandaGroup)),
  render: ({ name, expanded, contracting, extra_classes }) => html`
      <style>
          li{
              -webkit-transition: margin-bottom 0.1s;
              z-index : 0;
          }

          .ex-panda span{
              display : inline-block;
              color:#444444;
              padding:5px;
              font-family: helvetica;
              font-size : 1.2em;
          }

          icon{
              font-size : 1.1em;
              float:left;
          }

          .ex-panda{
              position : absolute;
              height: 50px;
              border: 1px solid grey;
              border-width : 1px 0px 0px 0px;
              background: #ffffff;
              width : 100%;
              background: -webkit-linear-gradient(rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%);
          }
          .ex-panda-details{
              width : 100%;
              position : absolute;
              background-color : grey;
              background: -webkit-linear-gradient(top, rgba(0,0,0,0.65) 0px,rgba(247,245,242,1) 5px);
              border-bottom: 1px solid lightgrey;
              font-family: helvetica;
          }
          .ex-panda-container{
              height :50px;
              width :100%;
          }

          .contracted div{
              -webkit-animation-name: slideup;
              -webkit-animation-duration: 0.2s;
          }

          .expanded div{
              -webkit-animation-name: slidedown;
              -webkit-animation-duration: 0.2s;
          }

          .trxing{
              z-index:-1;
          }

          .trxed{
              z-index: 0;
          }

          .item:hover {
              background-color : red;
          }

          @-webkit-keyframes slidedown {
              from {
                  margin-top: -50px; /* MAX HEIGHT */
                  opacity: 0;
              }
              to {
                  margin-top: 0px;
                  opacity: 1;
              }
          }

          @-webkit-keyframes slideup {
              from {
                  margin-top: 0px;
              }
              to {
                  margin-top: -50px;
              }
          }
      </style>
      <li class="ex-panda-container">
          <div class="ex-panda" onclick="${toggleItem}">
              ${name}
          </div>
      </li>
      ${(expanded || contracting) && html`
          <li
            class="ex-panda-detail-container ${extra_classes}"
            onanimationstart="${beginExpandAnimation}"
            onanimationend="${endExpandAnimation}"
          >
              <div class="ex-panda-details">
                  <slot></slot>
              </div>
          </li>
      `}
  `,
};

define('ex-panda-item', ExPandaItem);

export const ExPandaList = {
  orientation : property('vertical'),
  render: ({ orientation }) => html`
    <style>
        ul{
            padding:0px;
            margin:0px;
            list-style: none;
            list-style-type: none;
        }
    </style>
    <ul>
        <slot></slot>
    </ul>
  `,
};

define('ex-panda-list', ExPandaList);

export const ExPandaGroup = {
  name: property('something'),
  bg: property('grey'),
  bg_size: property(''),
  font: property(''),
  color: property('black'),
  threshold: property(4),
  host: parent(el => (el === ExPandaList) || (el === ExPandaGroup)),
  items: children(ExPandaItem),
  render: ({ name, list, bg, color, items, threshold, bg_size, font }) => html`
    <style>
        ul{
            padding:0px;
            margin:0px;
        }
        li{
            -webkit-transition: margin-bottom 0.2s;
            z-index : 0;
        }

        .ex-panda span{
            display : inline-block;
            color:#444444;
            padding:5px;
            font-family: helvetica;
            font-size : 1.2em;
        }

        icon{
            font-size : 1.1em;
            float:left;
        }

        .header{
            background : ${bg};
            ${bg_size && 'background-size:'+bg_size};
            ${font && 'font:'+font};
            color : ${color};
            border: 1px solid ${bg};
            height :2em;
        }

        .terminal{
            background : ${bg};
            ${bg_size && 'background-size:'+bg_size};
            ${font && 'font:'+font};
            color : ${color};
            border: 1px solid ${bg};
            height :1.5em;
        }

        a, a:link, a:visited, a:focus, a:hover, a:active{
            color : ${color}
        }

        .terminal a{
            text-decoration : none;
            color: ${color}
        }

        .terminal a:hover{
            text-shadow: 0 0 10px #fff, 0 0 2px #000
        }

        .header-container{
            height :2em;
            width :100%;
        }

        .terminal-container{
            height :1.5em;
            width : 100%;
        }

        ul {
            list-style: none;
        }
    </style>
    <ul class="ex-panda-list">
        <li class="header-container">
            <div class="header">
                ${name}
            </div>
        </li>
        <slot></slot>
        <li class="terminal-container">
            <div class="terminal">=
                ${items.length > threshold && html`
                    <span class="icon">⇧</span><a href="">back to group</a>
                `}
                ${items.length <= threshold && html`
                    <div style="display:inline-block; width: 5px; height: 5px"></div>
                `}
            </div>
        </li>
    </ul>
  `,
};

define('ex-panda-group', ExPandaGroup);
