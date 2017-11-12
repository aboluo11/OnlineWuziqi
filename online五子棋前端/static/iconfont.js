;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-user" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M791.296 679.663616l-56.064 0c-61.923328 0-112.128-50.148352-112.128-112.001024l0-35.984384c24.80128-29.452288 42.595328-64.28672 53.653504-101.095424 1.150976-6.206464 7.118848-9.269248 11.114496-13.534208 21.462016-21.438464 25.678848-57.613312 9.582592-83.373056-2.19136-3.908608-6.131712-7.302144-5.915648-12.140544 0-32.840704 0.166912-65.73568-0.050176-98.547712-0.87552-39.622656-12.214272-80.831488-40.025088-110.170112-22.450176-23.707648-53.269504-37.81632-85.083136-43.860992-40.185856-7.656448-82.235392-7.272448-122.037248 2.843648-34.49344 8.696832-66.905088 28.875776-86.94272 58.790912-17.738752 26.00448-25.515008 57.585664-26.8288 88.704-0.49152 33.414144-0.110592 66.910208-0.218112 100.40832 0.766976 6.700032-4.929536 11.2384-7.499776 16.789504-15.166464 27.480064-8.48896 64.914432 15.878144 84.901888 6.185984 4.268032 7.33696 12.032 9.580544 18.731008 10.621952 33.086464 28.251136 63.685632 50.535424 90.345472l0 37.18656c0 61.852672-50.205696 112.002048-112.128 112.002048l-56.066048 0c0 0-101.61664 28.00128-168.193024 168.00256l0 56.000512c0 30.952448 25.076736 56.000512 56.064 56.000512l784.897024 0c30.989312 0 56.064-25.048064 56.064-56.000512l0-56.000512C892.91264 707.662848 791.296 679.663616 791.296 679.663616z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-password" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M906.581333 757.312 634.965333 485.674667c9.706667-28.288 15.253333-58.517333 15.253333-90.112 0-153.173333-124.138667-277.333333-277.312-277.333333-153.173333 0-277.333333 124.16-277.333333 277.333333 0 153.194667 124.16 277.333333 277.333333 277.333333 67.136 0 128.682667-23.872 176.682667-63.552l16.618667 16.618667 0 110.016 4.458667 0 38.208 0 41.344 0 0 42.666667 0 42.666667 48.448 0 37.312 0 0 21.333333 0 42.666667 42.666667 0 85.333333 0 42.666667 0 0-42.666667 0-85.333333L906.581333 757.312zM372.906667 630.229333c-129.621333 0-234.666667-105.088-234.666667-234.666667 0-129.6 105.066667-234.666667 234.666667-234.666667s234.645333 105.066667 234.645333 234.666667S502.528 630.229333 372.906667 630.229333zM863.978667 842.645333l-85.333333 0 0-64-0.448 0-42.218667 0L698.666667 778.645333l0-42.666667 0-42.666667-48.448 0-41.344 0 0-85.333333-0.341333 0-28.501333-28.501333c14.037333-15.786667 26.496-33.002667 36.672-51.690667l247.274667 247.253333L863.978667 842.645333zM341.333333 277.333333c-47.125333 0-85.333333 38.208-85.333333 85.333333s38.208 85.333333 85.333333 85.333333 85.333333-38.208 85.333333-85.333333S388.458667 277.333333 341.333333 277.333333zM341.333333 405.333333c-23.552 0-42.666667-19.114667-42.666667-42.666667s19.114667-42.666667 42.666667-42.666667 42.666667 19.114667 42.666667 42.666667S364.885333 405.333333 341.333333 405.333333z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)