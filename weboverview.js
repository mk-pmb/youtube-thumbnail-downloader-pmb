/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = {};
  EX.resos = [
    '',
    'mq',
    'hq',
    'sd',
    'maxres',
  ];
  EX.css = [
    '<style>',
    'a { text-decoration: none; border-width: 0; }',
    'ul, li { margin: 0; padding: 0; list-style-type: none; }',
    'ul {',
    '  white-space: nowrap;',
    '  overflow-x: scroll;',
    '  margin-top: 1em;',
    '  background-color: dimgrey;',
    '  padding: 1ex 1em;',
    '}',
    'li { display: inline-block; position: relative; margin-right: 1em;',
    '  background-color: gainsboro; min-width: 1em; min-height: 1em; }',
    'li img { display: block; }',
    'li input { display: none; position: absolute; left: 0; bottom: 0; }',
    'li:hover input { display: block; }',
  ].join('\n  ') + '\n</style>\n';

  function byid(id) { return (document.getElementById(id) || false); }
  function fval(id) { return (byid(id).value || ''); }

  EX.tryGenThumbsHtml = function () {
    try {
      EX.genThumbsHtml();
    } catch (err) {
      byid('thumbs').innerHTML = '';
      byid('thumbs').innerText = String(err);
    }
  };

  EX.genThumbsHtml = function () {
    var html = EX.css, videoId = fval('video_id'),
      basu = fval('baseurl') + videoId, flags;
    if (videoId) { basu += '/'; }
    flags = ((byid('live').checked && '_live')
      || '');
    html += '<ul class="reso reso-empty">\n';
    html += EX.renderThumb(basu, '', '0', flags);
    html += '</ul>\n';
    EX.resos.forEach(function addOneReso(resoName, imgNum) {
      html += '<ul class="reso reso-' + (resoName || 'empty') + '">\n';
      for (imgNum = 0; imgNum <= 3; imgNum += 1) {
        html += EX.renderThumb(basu, resoName, imgNum || 'default', flags);
      }
      html += '</ul>\n';
    });
    html = html.replace(/\n(?=[\s\S])/g, '\n  ');
    byid('thumbs').innerHTML = html;
  };

  EX.renderThumb = function (basu, resoName, imgName, flags) {
    var sub = resoName + imgName + flags + '.jpg', url = basu + sub;
    return ('  <li class="thumb imgname-' + imgName
      + '"><a href="' + url + '"><img src="' + url
      + '" alt="' + sub
      + '" title="' + sub
      + '"></a><input type="text" size="5" value="' + url + '"></li>\n');
  };

  (function () {
    var form = document.forms[0];
    if (form) {
      form.onsubmit = function () {
        setTimeout(EX.tryGenThumbsHtml, 10);
        return false;
      };
    } else {
      EX.tryGenThumbsHtml();
    }
  }());

















}());
