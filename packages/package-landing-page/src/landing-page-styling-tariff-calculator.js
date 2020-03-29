import {css} from "lit-element";

// language=CSS
export const landingPageStylingTariffCalculator = css`
    .wgt-container .wgt-table,.wgt-modal .wgt-table,.wgt-root table {
        border-collapse: collapse
    }
    
    .wgt-container .wgt-btn-blue:focus,.wgt-container .wgt-btn-red:focus,.wgt-container .wgt-btn-white:focus,.wgt-modal,.wgt-modal .wgt-btn-blue:focus,.wgt-modal .wgt-btn-red:focus,.wgt-modal .wgt-btn-white:focus,.wgt-modal .wgt-close:focus,.wgt-modal .wgt-modal-content,.wgt-root a:active,.wgt-root a:hover {
        outline: 0
    }
    
    .wgt-root {
        /*! normalize.css v3.0.2 | MIT License | git.io/normalize */
    }
    
    .wgt-root html {
        font-family: sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%
    }
    
    .wgt-root body {
        margin: 0
    }
    
    .wgt-root article,.wgt-root aside,.wgt-root details,.wgt-root figcaption,.wgt-root figure,.wgt-root footer,.wgt-root header,.wgt-root hgroup,.wgt-root main,.wgt-root menu,.wgt-root nav,.wgt-root section,.wgt-root summary {
        display: block
    }
    
    .wgt-root audio,.wgt-root canvas,.wgt-root progress,.wgt-root video {
        display: inline-block;
        vertical-align: baseline
    }
    
    .wgt-root audio:not([controls]) {
        display: none;
        height: 0
    }
    
    .wgt-root [hidden],.wgt-root template {
        display: none
    }
    
    .wgt-root a {
        background-color: transparent
    }
    
    .wgt-root abbr[title] {
        border-bottom: 1px dotted
    }
    
    .wgt-root b,.wgt-root strong {
        font-weight: 700
    }
    
    .wgt-root dfn {
        font-style: italic
    }
    
    .wgt-root h1 {
        font-size: 2em;
        margin: .67em 0
    }
    
    .wgt-root mark {
        background: #ff0;
        color: #000
    }
    
    .wgt-root small {
        font-size: 80%
    }
    
    .wgt-root sub,.wgt-root sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline
    }
    
    .wgt-root sup {
        top: -.5em
    }
    
    .wgt-root sub {
        bottom: -.25em
    }
    
    .wgt-root label {
        font-weight: 400
    }
    
    .wgt-root img {
        border: 0
    }
    
    .wgt-root svg:not(:root) {
        overflow: hidden
    }
    
    .wgt-root figure {
        margin: 1em 40px
    }
    
    .wgt-root hr {
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        height: 0
    }
    
    .wgt-root pre {
        overflow: auto
    }
    
    .wgt-root code,.wgt-root kbd,.wgt-root pre,.wgt-root samp {
        font-family: monospace,monospace;
        font-size: 1em
    }
    
    .wgt-root button,.wgt-root input,.wgt-root optgroup,.wgt-root select,.wgt-root textarea {
        color: inherit;
        font: inherit;
        margin: 0
    }
    
    .wgt-root button {
        overflow: visible
    }
    
    .wgt-root button,.wgt-root select {
        text-transform: none
    }
    
    .wgt-root button,.wgt-root html input[type=button],.wgt-root input[type=reset],.wgt-root input[type=submit] {
        -webkit-appearance: button;
        cursor: pointer
    }
    
    .wgt-root button[disabled],.wgt-root html input[disabled] {
        cursor: default
    }
    
    .wgt-root button::-moz-focus-inner,.wgt-root input::-moz-focus-inner {
        border: 0;
        padding: 0
    }
    
    .wgt-root input {
        line-height: normal
    }
    
    .wgt-root input[type=checkbox],.wgt-root input[type=radio] {
        box-sizing: border-box;
        padding: 0
    }
    
    .wgt-root input[type=number]::-webkit-inner-spin-button,.wgt-root input[type=number]::-webkit-outer-spin-button {
        height: auto
    }
    
    .wgt-root input[type=search] {
        -webkit-appearance: textfield;
        -moz-box-sizing: content-box;
        -webkit-box-sizing: content-box;
        box-sizing: content-box
    }
    
    .wgt-root input[type=search]::-webkit-search-cancel-button,.wgt-root input[type=search]::-webkit-search-decoration {
        -webkit-appearance: none
    }
    
    .wgt-root fieldset {
        border: 1px solid silver;
        margin: 0 2px;
        padding: .35em .625em .75em
    }
    
    .wgt-root legend {
        border: 0;
        padding: 0
    }
    
    .wgt-root textarea {
        overflow: auto
    }
    
    .wgt-root optgroup {
        font-weight: 700
    }
    
    .wgt-root table {
        border-spacing: 0
    }
    
    .wgt-root td,.wgt-root th {
        padding: 0
    }
    
    .wgt-container,.wgt-modal {
        line-height: 1.428571429;
        font-family: FrutigerLTW01-57Condens,sans-serif;
        font-size: 14px;
        color: #000
    }
    
    .wgt-container *,.wgt-modal * {
        line-height: inherit;
        margin: 0;
        padding: 0;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box
    }
    
    .wgt-container div,.wgt-modal div {
        display: block
    }
    
    .wgt-container p,.wgt-modal p {
        display: block;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
        -webkit-margin-start: 0;
        -webkit-margin-end: 0;
        margin: 1em 0
    }
    
    .wgt-container img,.wgt-modal img {
        display: block;
        border: 0;
        outline: 0
    }
    
    .wgt-container table,.wgt-modal table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px
    }
    
    .wgt-container label>input[type=checkbox],.wgt-modal label>input[type=checkbox] {
        margin-right: .5em!important
    }
    
    .wgt-container .wgt-row:before,.wgt-modal .wgt-row:before {
        display: table;
        content: " "
    }
    
    .wgt-container .wgt-row:after,.wgt-modal .wgt-row:after {
        display: table;
        content: " ";
        clear: both
    }
    
    .wgt-container .wgt-col-sm-3,.wgt-container .wgt-col-sm-4,.wgt-container .wgt-col-sm-5,.wgt-container .wgt-col-sm-7,.wgt-container .wgt-col-sm-8,.wgt-container .wgt-col-sm-9,.wgt-container .wgt-col-xs-1,.wgt-container .wgt-col-xs-10,.wgt-container .wgt-col-xs-11,.wgt-container .wgt-col-xs-12,.wgt-container .wgt-col-xs-2,.wgt-container .wgt-col-xs-4,.wgt-container .wgt-col-xs-6,.wgt-modal .wgt-col-sm-3,.wgt-modal .wgt-col-sm-4,.wgt-modal .wgt-col-sm-5,.wgt-modal .wgt-col-sm-7,.wgt-modal .wgt-col-sm-8,.wgt-modal .wgt-col-sm-9,.wgt-modal .wgt-col-xs-1,.wgt-modal .wgt-col-xs-10,.wgt-modal .wgt-col-xs-11,.wgt-modal .wgt-col-xs-12,.wgt-modal .wgt-col-xs-2,.wgt-modal .wgt-col-xs-4,.wgt-modal .wgt-col-xs-6 {
        position: relative;
        min-height: 1px;
        padding-left: 7.5px;
        padding-right: 7.5px;
        float: left
    }
    
    .wgt-container .wgt-col-xs-12,.wgt-modal .wgt-col-xs-12 {
        width: 100%
    }
    
    .wgt-container .wgt-col-xs-11,.wgt-modal .wgt-col-xs-11 {
        width: 91.66666666666666%
    }
    
    .wgt-container .wgt-col-xs-10,.wgt-modal .wgt-col-xs-10 {
        width: 83.33333333%
    }
    
    .wgt-container .wgt-col-xs-2,.wgt-modal .wgt-col-xs-2 {
        width: 16.66666667%
    }
    
    .wgt-container .wgt-col-xs-6,.wgt-modal .wgt-col-xs-6 {
        width: 50%
    }
    
    .wgt-container .wgt-col-xs-1,.wgt-modal .wgt-col-xs-1 {
        width: 8.333333333333332%
    }
    
    .wgt-container .wgt-row,.wgt-modal .wgt-row {
        margin-left: -7.5px;
        margin-right: -7.5px
    }
    
    .wgt-container .wgt-mr15,.wgt-modal .wgt-mr15 {
        margin-right: 15px
    }
    
    .wgt-container .wgt-mt5,.wgt-modal .wgt-mt5 {
        margin-top: 5px!important
    }
    
    .wgt-container .wgt-tooltip,.wgt-modal .wgt-tooltip {
        position: absolute;
        z-index: 1070;
        display: block;
        visibility: visible;
        font-weight: 400;
        line-height: 1.4;
        opacity: 0;
        filter: alpha(opacity=0)
    }
    
    .wgt-container .wgt-tooltip.wgt-in,.wgt-modal .wgt-tooltip.wgt-in {
        opacity: .9;
        filter: alpha(opacity=90)
    }
    
    .wgt-container .wgt-tooltip.wgt-top,.wgt-modal .wgt-tooltip.wgt-top {
        margin-top: -3px;
        padding: 5px 0
    }
    
    .wgt-container .wgt-tooltip-inner,.wgt-modal .wgt-tooltip-inner {
        max-width: 200px;
        padding: 3px 8px;
        color: #2574be;
        text-align: center;
        text-decoration: none;
        background-color: #e6e6e6;
        border-radius: 2px;
        font-size: 14px
    }
    
    .wgt-container .wgt-tooltip-arrow,.wgt-modal .wgt-tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid
    }
    
    .wgt-container .wgt-tooltip.wgt-top .wgt-tooltip-arrow,.wgt-modal .wgt-tooltip.wgt-top .wgt-tooltip-arrow {
        bottom: 0;
        left: 50%;
        margin-left: -5px;
        border-width: 5px 5px 0;
        border-top-color: #e6e6e6
    }
    
    .wgt-container .wgt-tooltip.wgt-top-left .wgt-tooltip-arrow,.wgt-modal .wgt-tooltip.wgt-top-left .wgt-tooltip-arrow {
        bottom: 0;
        right: 5px;
        margin-bottom: -5px;
        border-width: 5px 5px 0;
        border-top-color: #e6e6e6
    }
    
    .wgt-container .wgt-tooltip.wgt-top-right .wgt-tooltip-arrow,.wgt-modal .wgt-tooltip.wgt-top-right .wgt-tooltip-arrow {
        bottom: 0;
        left: 5px;
        margin-bottom: -5px;
        border-width: 5px 5px 0;
        border-top-color: #e6e6e6
    }
    
    .wgt-container .wgt-nav-tabs,.wgt-modal .wgt-nav-tabs {
        list-style: none;
        margin: 0;
        padding: 0
    }
    
    .wgt-container .wgt-nav-tabs>li,.wgt-modal .wgt-nav-tabs>li {
        display: inline-block;
        width: 50%;
        float: left
    }
    
    .wgt-container .wgt-nav-tabs>li>a,.wgt-modal .wgt-nav-tabs>li>a {
        text-decoration: none;
        color: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li>a svg,.wgt-container .wgt-nav-tabs>li>a>img,.wgt-modal .wgt-nav-tabs>li>a svg,.wgt-modal .wgt-nav-tabs>li>a>img {
        max-height: 35px
    }
    
    .wgt-container .wgt-nav-tabs>li>a>span,.wgt-modal .wgt-nav-tabs>li>a>span {
        color: #fff;
        font-size: 15px
    }
    
    .wgt-container .wgt-nav-tabs>li:first-child,.wgt-modal .wgt-nav-tabs>li:first-child {
        background: #a4acbf;
        border-bottom: 1px solid #fff;
        border-right: 1px solid #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:first-child img,.wgt-container .wgt-nav-tabs>li:first-child svg,.wgt-modal .wgt-nav-tabs>li:first-child img,.wgt-modal .wgt-nav-tabs>li:first-child svg {
        width: 22px
    }
    
    .wgt-container .wgt-nav-tabs>li:first-child .wgt-svg circle,.wgt-container .wgt-nav-tabs>li:first-child .wgt-svg path,.wgt-modal .wgt-nav-tabs>li:first-child .wgt-svg circle,.wgt-modal .wgt-nav-tabs>li:first-child .wgt-svg path {
        fill: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:first-child:hover,.wgt-modal .wgt-nav-tabs>li:first-child:hover {
        background: #e6e6e6
    }
    
    .wgt-container .wgt-nav-tabs>li:first-child.wgt-active,.wgt-modal .wgt-nav-tabs>li:first-child.wgt-active {
        background: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:first-child.wgt-active .wgt-svg circle,.wgt-container .wgt-nav-tabs>li:first-child.wgt-active .wgt-svg path,.wgt-modal .wgt-nav-tabs>li:first-child.wgt-active .wgt-svg circle,.wgt-modal .wgt-nav-tabs>li:first-child.wgt-active .wgt-svg path {
        fill: #a4acbf
    }
    
    .wgt-container .wgt-nav-tabs>li:first-child.wgt-active a,.wgt-container .wgt-nav-tabs>li:first-child.wgt-active a>span,.wgt-modal .wgt-nav-tabs>li:first-child.wgt-active a,.wgt-modal .wgt-nav-tabs>li:first-child.wgt-active a>span {
        color: #a4acbf
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(2),.wgt-modal .wgt-nav-tabs>li:nth-child(2) {
        background: #246cb0;
        border-bottom: 1px solid #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(2) img,.wgt-container .wgt-nav-tabs>li:nth-child(2) svg,.wgt-modal .wgt-nav-tabs>li:nth-child(2) img,.wgt-modal .wgt-nav-tabs>li:nth-child(2) svg {
        width: 38px
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(2) .wgt-svg circle,.wgt-container .wgt-nav-tabs>li:nth-child(2) .wgt-svg path,.wgt-modal .wgt-nav-tabs>li:nth-child(2) .wgt-svg circle,.wgt-modal .wgt-nav-tabs>li:nth-child(2) .wgt-svg path {
        fill: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(2):hover,.wgt-modal .wgt-nav-tabs>li:nth-child(2):hover {
        background: #1b5286
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(2).wgt-active,.wgt-modal .wgt-nav-tabs>li:nth-child(2).wgt-active {
        background: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(2).wgt-active .wgt-svg circle,.wgt-container .wgt-nav-tabs>li:nth-child(2).wgt-active .wgt-svg path,.wgt-modal .wgt-nav-tabs>li:nth-child(2).wgt-active .wgt-svg circle,.wgt-modal .wgt-nav-tabs>li:nth-child(2).wgt-active .wgt-svg path {
        fill: #246cb0
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(2).wgt-active a,.wgt-container .wgt-nav-tabs>li:nth-child(2).wgt-active a>span,.wgt-modal .wgt-nav-tabs>li:nth-child(2).wgt-active a,.wgt-modal .wgt-nav-tabs>li:nth-child(2).wgt-active a>span {
        color: #246cb0
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(3),.wgt-modal .wgt-nav-tabs>li:nth-child(3) {
        background: #900000;
        border-right: 1px solid #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(3) img,.wgt-container .wgt-nav-tabs>li:nth-child(3) svg,.wgt-modal .wgt-nav-tabs>li:nth-child(3) img,.wgt-modal .wgt-nav-tabs>li:nth-child(3) svg {
        width: 37px
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(3) .wgt-svg circle,.wgt-container .wgt-nav-tabs>li:nth-child(3) .wgt-svg path,.wgt-modal .wgt-nav-tabs>li:nth-child(3) .wgt-svg circle,.wgt-modal .wgt-nav-tabs>li:nth-child(3) .wgt-svg path {
        fill: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(3):hover,.wgt-modal .wgt-nav-tabs>li:nth-child(3):hover {
        background: #5d0000
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(3).wgt-active,.wgt-modal .wgt-nav-tabs>li:nth-child(3).wgt-active {
        background: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(3).wgt-active .wgt-svg circle,.wgt-container .wgt-nav-tabs>li:nth-child(3).wgt-active .wgt-svg path,.wgt-modal .wgt-nav-tabs>li:nth-child(3).wgt-active .wgt-svg circle,.wgt-modal .wgt-nav-tabs>li:nth-child(3).wgt-active .wgt-svg path {
        fill: #900000
    }
    
    .wgt-container .wgt-nav-tabs>li:nth-child(3).wgt-active a,.wgt-container .wgt-nav-tabs>li:nth-child(3).wgt-active a>span,.wgt-modal .wgt-nav-tabs>li:nth-child(3).wgt-active a,.wgt-modal .wgt-nav-tabs>li:nth-child(3).wgt-active a>span {
        color: #900000
    }
    
    .wgt-container .wgt-nav-tabs>li:last-child,.wgt-modal .wgt-nav-tabs>li:last-child {
        background: #0a6b74
    }
    
    .wgt-container .wgt-nav-tabs>li:last-child img,.wgt-container .wgt-nav-tabs>li:last-child svg,.wgt-modal .wgt-nav-tabs>li:last-child img,.wgt-modal .wgt-nav-tabs>li:last-child svg {
        width: 42px
    }
    
    .wgt-container .wgt-nav-tabs>li:last-child .wgt-svg circle,.wgt-container .wgt-nav-tabs>li:last-child .wgt-svg path,.wgt-modal .wgt-nav-tabs>li:last-child .wgt-svg circle,.wgt-modal .wgt-nav-tabs>li:last-child .wgt-svg path {
        fill: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:last-child:hover,.wgt-modal .wgt-nav-tabs>li:last-child:hover {
        background: #064045
    }
    
    .wgt-container .wgt-nav-tabs>li:last-child.wgt-active,.wgt-modal .wgt-nav-tabs>li:last-child.wgt-active {
        background: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li:last-child.wgt-active .wgt-svg circle,.wgt-container .wgt-nav-tabs>li:last-child.wgt-active .wgt-svg path,.wgt-modal .wgt-nav-tabs>li:last-child.wgt-active .wgt-svg circle,.wgt-modal .wgt-nav-tabs>li:last-child.wgt-active .wgt-svg path {
        fill: #0a6b74
    }
    
    .wgt-container .wgt-nav-tabs>li:last-child.wgt-active a,.wgt-container .wgt-nav-tabs>li:last-child.wgt-active a>span,.wgt-modal .wgt-nav-tabs>li:last-child.wgt-active a,.wgt-modal .wgt-nav-tabs>li:last-child.wgt-active a>span {
        color: #0a6b74
    }
    
    .wgt-container .wgt-nav-tabs>li.wgt-tablink>a,.wgt-modal .wgt-nav-tabs>li.wgt-tablink>a {
        text-decoration: none;
        color: #fff;
        background: #fff;
        border-bottom: 1px solid #fff;
        border-right: 1px solid #fff
    }
    
    .wgt-container .wgt-nav-tabs>li.wgt-tablink>a svg,.wgt-container .wgt-nav-tabs>li.wgt-tablink>a>img,.wgt-modal .wgt-nav-tabs>li.wgt-tablink>a svg,.wgt-modal .wgt-nav-tabs>li.wgt-tablink>a>img {
        max-height: 15px;
        width: auto
    }
    
    .wgt-container .wgt-nav-tabs>li.wgt-tablink>a .wgt-svg circle,.wgt-container .wgt-nav-tabs>li.wgt-tablink>a .wgt-svg path,.wgt-modal .wgt-nav-tabs>li.wgt-tablink>a .wgt-svg circle,.wgt-modal .wgt-nav-tabs>li.wgt-tablink>a .wgt-svg path {
        fill: #fff
    }
    
    .wgt-container .wgt-nav-tabs>li.wgt-tablink>a:hover,.wgt-modal .wgt-nav-tabs>li.wgt-tablink>a:hover {
        background: #e6e6e6
    }
    
    .wgt-container .wgt-nav-tabs a,.wgt-modal .wgt-nav-tabs a {
        display: block;
        height: 55px;
        text-align: center;
        vertical-align: middle;
        line-height: 55px
    }
    
    .wgt-container .wgt-nav-tabs span,.wgt-modal .wgt-nav-tabs span {
        display: inline-block
    }
    
    .wgt-container .wgt-nav-tabs img,.wgt-container .wgt-nav-tabs svg,.wgt-modal .wgt-nav-tabs img,.wgt-modal .wgt-nav-tabs svg {
        display: inline-block;
        margin-right: 15px;
        vertical-align: middle
    }
    
    .wgt-container .wgt-tab-content,.wgt-modal .wgt-tab-content {
        clear: both;
        background: #fff;
        padding: 30px
    }
    
    .wgt-container .wgt-tab-content>.wgt-tab-pane,.wgt-modal .wgt-tab-content>.wgt-tab-pane {
        display: none
    }
    
    .wgt-container .wgt-tab-content>.wgt-active,.wgt-modal .wgt-tab-content>.wgt-active {
        display: block
    }
    
    .wgt-container .wgt-tab-content label,.wgt-modal .wgt-tab-content label {
        margin-bottom: 15px;
        display: inline-block
    }
    
    .wgt-container .wgt-tab-content .wgt-no-insurance,.wgt-modal .wgt-tab-content .wgt-no-insurance {
        margin-bottom: 25px;
        margin-right: 30px
    }
    
    .wgt-container .wgt-tab-content .wgt-tab-pane .wgt-btn-tarif,.wgt-modal .wgt-tab-content .wgt-tab-pane .wgt-btn-tarif {
        width: 70%;
        float: right
    }
    
    .wgt-container .wgt-table thead,.wgt-modal .wgt-table thead {
        display: table-header-group;
        vertical-align: middle;
        border-color: inherit
    }
    
    .wgt-container .wgt-table thead tr.wgt-table-times td,.wgt-modal .wgt-table thead tr.wgt-table-times td {
        color: #246cb0;
        font-size: 14px;
        text-align: center;
        font-weight: 700
    }
    
    .wgt-container .wgt-table thead tr.wgt-table-times td:first-child,.wgt-modal .wgt-table thead tr.wgt-table-times td:first-child {
        color: #000;
        text-align: left
    }
    
    .wgt-container .wgt-table td i,.wgt-container .wgt-table-responsive p,.wgt-modal .wgt-table td i,.wgt-modal .wgt-table-responsive p {
        color: #246cb0
    }
    
    .wgt-container .wgt-table thead tr td,.wgt-modal .wgt-table thead tr td {
        border-top: 2px solid #246cb0;
        border-bottom: 2px solid #246cb0
    }
    
    .wgt-container .wgt-table thead tr th,.wgt-modal .wgt-table thead tr th {
        text-align: center;
        max-width: 8em
    }
    
    .wgt-container .wgt-table thead tr th:first-child,.wgt-modal .wgt-table thead tr th:first-child {
        text-align: left
    }
    
    .wgt-container .wgt-table tbody,.wgt-modal .wgt-table tbody {
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit
    }
    
    .wgt-container .wgt-table tbody td,.wgt-modal .wgt-table tbody td {
        border-top: 1px solid #efefef
    }
    
    .wgt-container .wgt-table tfoot tr td,.wgt-modal .wgt-table tfoot tr td {
        font-size: 80%!important;
        border-top: 2px solid #246cb0
    }
    
    .wgt-container .wgt-table tr,.wgt-modal .wgt-table tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit
    }
    
    .wgt-container .wgt-table td,.wgt-modal .wgt-table td {
        display: table-cell;
        padding: 7px 0;
        min-width: 130px;
        text-align: center
    }
    
    .wgt-container .wgt-table td:first-child,.wgt-modal .wgt-table td:first-child {
        font-size: 14px;
        min-width: 200px;
        text-align: left
    }
    
    .wgt-container .wgt-table th,.wgt-modal .wgt-table th {
        text-align: left;
        color: #246cb0;
        font-size: 16px;
        font-weight: 700;
        padding: 10px 0
    }
    
    .wgt-container .wgt-radio-btn,.wgt-modal .wgt-radio-btn {
        vertical-align: middle;
        margin-right: 10px
    }
    
    .wgt-container .wgt-table-responsive,.wgt-modal .wgt-table-responsive {
        min-height: .01%;
        overflow-x: auto
    }
    
    .wgt-container .wgt-tab-content .wgt-btn-blue,.wgt-container .wgt-tab-content .wgt-btn-red,.wgt-modal .wgt-tab-content .wgt-btn-blue,.wgt-modal .wgt-tab-content .wgt-btn-red {
        width: 50%;
        float: right;
        margin-left: 2em
    }
    
    .wgt-container .wgt-information,.wgt-modal .wgt-information {
        display: none
    }
    
    .wgt-container .wgt-information .wgt-nav-tabs,.wgt-modal .wgt-information .wgt-nav-tabs {
        margin-top: 15px
    }
    
    .wgt-container .wgt-information .wgt-nav-tabs li,.wgt-modal .wgt-information .wgt-nav-tabs li {
        background-color: #f5f5f5;
        background: -webkit-linear-gradient(90deg,#f5f5f5 0,#fff 100%);
        background: -moz-linear-gradient(90deg,#f5f5f5 0,#fff 100%);
        background: -o-linear-gradient(90deg,#f5f5f5 0,#fff 100%);
        background: -ms-linear-gradient(90deg,#f5f5f5 0,#fff 100%);
        background: linear-gradient(0deg,#f5f5f5 0,#fff 100%);
        -webkit-transition: all .3s ease;
        -o-transition: all .3s ease;
        transition: all .3s ease;
        border: 1px solid #d2d2d2;
        border-right: none
    }
    
    .wgt-container .wgt-information .wgt-nav-tabs li a,.wgt-modal .wgt-information .wgt-nav-tabs li a {
        color: #2574be;
        font-weight: 700;
        height: 35px;
        line-height: 35px
    }
    
    .wgt-container .wgt-information .wgt-nav-tabs li:first-child,.wgt-modal .wgt-information .wgt-nav-tabs li:first-child {
        border-left: none
    }
    
    .wgt-container .wgt-information .wgt-nav-tabs li:hover,.wgt-modal .wgt-information .wgt-nav-tabs li:hover {
        background: #dcdcdc
    }
    
    .wgt-container .wgt-information .wgt-nav-tabs li.wgt-active,.wgt-modal .wgt-information .wgt-nav-tabs li.wgt-active {
        background-color: #1f62a0;
        background: -webkit-linear-gradient(90deg,#1f62a0 0,#2574be 100%);
        background: -moz-linear-gradient(90deg,#1f62a0 0,#2574be 100%);
        background: -o-linear-gradient(90deg,#1f62a0 0,#2574be 100%);
        background: -ms-linear-gradient(90deg,#1f62a0 0,#2574be 100%);
        background: linear-gradient(0deg,#1f62a0 0,#2574be 100%)
    }
    
    .wgt-container .wgt-information .wgt-nav-tabs li.wgt-active a,.wgt-modal .wgt-information .wgt-nav-tabs li.wgt-active a {
        color: #fff
    }
    
    .wgt-container .wgt-btn-red,.wgt-modal .wgt-btn-red {
        border-radius: 4px;
        background-color: #b32540;
        background: -webkit-linear-gradient(90deg,#b32540 0,#c22845 100%);
        background: -moz-linear-gradient(90deg,#b32540 0,#c22845 100%);
        background: -o-linear-gradient(90deg,#b32540 0,#c22845 100%);
        background: -ms-linear-gradient(90deg,#b32540 0,#c22845 100%);
        background: linear-gradient(0deg,#b32540 0,#c22845 100%);
        height: 31px;
        border: none;
        color: #fff;
        font-weight: 700
    }
    
    .wgt-container .wgt-btn-red:hover,.wgt-modal .wgt-btn-red:hover {
        background: #891c31;
        cursor: pointer
    }
    
    .wgt-container .wgt-btn-white,.wgt-modal .wgt-btn-white {
        border-radius: 4px;
        background-color: #f5f5f5;
        background: -webkit-linear-gradient(90deg,#f5f5f5 0,#fff 100%);
        background: -moz-linear-gradient(90deg,#f5f5f5 0,#fff 100%);
        background: -o-linear-gradient(90deg,#f5f5f5 0,#fff 100%);
        background: -ms-linear-gradient(90deg,#f5f5f5 0,#fff 100%);
        background: linear-gradient(0deg,#f5f5f5 0,#fff 100%);
        height: 31px;
        color: #2574be;
        font-weight: 700;
        border: 1px solid #d2d2d2
    }
    
    .wgt-container .wgt-btn-white:hover,.wgt-modal .wgt-btn-white:hover {
        background: #e6e6e6;
        cursor: pointer
    }
    
    .wgt-container .wgt-btn-blue,.wgt-modal .wgt-btn-blue {
        border-radius: 4px;
        background-color: #1f62a0;
        background: -webkit-linear-gradient(90deg,#1f62a0 0,#2574be 100%);
        background: -moz-linear-gradient(90deg,#1f62a0 0,#2574be 100%);
        background: -o-linear-gradient(90deg,#1f62a0 0,#2574be 100%);
        background: -ms-linear-gradient(90deg,#1f62a0 0,#2574be 100%);
        background: linear-gradient(0deg,#1f62a0 0,#2574be 100%);
        height: 31px;
        border: none;
        color: #fff;
        font-weight: 700
    }
    
    .wgt-container .wgt-btn-blue:hover,.wgt-modal .wgt-btn-blue:hover {
        background: #1d5a93;
        cursor: pointer
    }
    
    .wgt-container .wgt-btn-save-tarif,.wgt-modal .wgt-btn-save-tarif {
        padding: 0 40px;
        margin-right: 15px;
        margin-bottom: 15px
    }
    
    .wgt-container .wgt-tarif-selectbox,.wgt-modal .wgt-tarif-selectbox {
        border-top: 1px solid #e5e5e5
    }
    
    .wgt-container .wgt-tarif-save,.wgt-modal .wgt-tarif-save {
        overflow: hidden;
        width: 100%
    }
    
    .wgt-container .wgt-tarif-save img,.wgt-modal .wgt-tarif-save img {
        width: 100%
    }
    
    .wgt-container .wgt-tarif-price,.wgt-modal .wgt-tarif-price {
        text-align: center;
        padding: 20px;
        width: 100%;
        min-height: 213px
    }
    
    .wgt-container .wgt-tarif-price p,.wgt-modal .wgt-tarif-price p {
        font-size: 76px;
        color: #2574be;
        margin: 0
    }
    
    .wgt-container .wgt-tarif-price span,.wgt-modal .wgt-tarif-price span {
        color: #2574be;
        font-style: italic
    }
    
    .wgt-container .wgt-tarif-price sup,.wgt-modal .wgt-tarif-price sup {
        position: static;
        vertical-align: super;
        color: #2574be
    }
    
    .wgt-container .wgt-tarif-price sup:first-child,.wgt-modal .wgt-tarif-price sup:first-child {
        font-size: 30px;
        top: -34px;
        margin-right: 10px
    }
    
    .wgt-container .wgt-tarif-price sup:nth-child(2),.wgt-modal .wgt-tarif-price sup:nth-child(2) {
        font-size: 30px;
        top: -30px;
        left: 10px
    }
    
    .wgt-container .wgt-tarif-price sup:last-child,.wgt-modal .wgt-tarif-price sup:last-child {
        font-size: 14px;
        top: 0;
        left: -17px
    }
    
    .wgt-container .wgt-text-right,.wgt-modal .wgt-text-right {
        text-align: right
    }
    
    .wgt-container .wgt-select-box,.wgt-modal .wgt-select-box {
        margin-bottom: 20px;
        width: 100%;
        overflow: hidden;
        border-radius: 2px;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: right 0 top
    }
    
    .wgt-container .wgt-select-box select,.wgt-modal .wgt-select-box select {
        height: 25px;
        background: 0 0;
        border: 0;
        cursor: pointer
    }
    
    .wgt-container .wgt-tarif-select,.wgt-modal .wgt-tarif-select {
        margin: 15px 0;
        border: 1px solid #e5e5e5;
        border-radius: 2px
    }
    
    .wgt-container .wgt-tarif-select .wgt-select-box,.wgt-modal .wgt-tarif-select .wgt-select-box {
        margin-bottom: 0;
        height: 40px;
        background-image: url(https://wwwapi.serviceeu.com/rt/img/drop-down-1.png);
        border-bottom: 1px solid #e5e5e5
    }
    
    .wgt-container .wgt-tarif-select .wgt-select-box select,.wgt-modal .wgt-tarif-select .wgt-select-box select {
        color: #303030;
        font-weight: 400;
        height: 40px;
        width: 120%;
        padding-left: 5px
    }
    
    .wgt-container .wgt-tarif-select .wgt-static-box,.wgt-modal .wgt-tarif-select .wgt-static-box {
        margin: 0;
        padding: 1em .5em;
        border-bottom: 1px solid #e5e5e5
    }
    
    .wgt-container .wgt-tarif-select input,.wgt-modal .wgt-tarif-select input {
        height: 40px;
        width: 100%;
        border: none;
        padding-left: 8px;
        color: #303030
    }
    
    .wgt-container .wgt-select-box.wgt-has-error,.wgt-container input.wgt-has-error,.wgt-modal .wgt-select-box.wgt-has-error,.wgt-modal input.wgt-has-error {
        border: 1px solid #f80c0c;
        color: #f80c0c
    }
    
    .wgt-container .wgt-tarif-select input::-moz-placeholder,.wgt-modal .wgt-tarif-select input::-moz-placeholder {
        color: #303030;
        opacity: 1
    }
    
    .wgt-container .wgt-tarif-select input:-ms-input-placeholder,.wgt-modal .wgt-tarif-select input:-ms-input-placeholder {
        color: #303030
    }
    
    .wgt-container .wgt-tarif-select input::-webkit-input-placeholder,.wgt-modal .wgt-tarif-select input::-webkit-input-placeholder {
        color: #303030
    }
    
    .wgt-container .wgt-tarif-select+label>input[type=checkbox],.wgt-modal .wgt-tarif-select+label>input[type=checkbox] {
        margin: 2px 4px
    }
    
    .wgt-container input.wgt-has-error::-webkit-input-placeholder,.wgt-modal input.wgt-has-error::-webkit-input-placeholder {
        color: #f80c0c
    }
    
    .wgt-container input.wgt-has-error:-moz-placeholder,.wgt-modal input.wgt-has-error:-moz-placeholder {
        color: #f80c0c;
        opacity: 1
    }
    
    .wgt-container input.wgt-has-error::-moz-placeholder,.wgt-modal input.wgt-has-error::-moz-placeholder {
        color: #f80c0c;
        opacity: 1
    }
    
    .wgt-container input.wgt-has-error:-ms-input-placeholder,.wgt-modal input.wgt-has-error:-ms-input-placeholder {
        color: #f80c0c
    }
    
    .wgt-container label.wgt-has-error,.wgt-modal label.wgt-has-error {
        color: #f80c0c
    }
    
    .wgt-container .wgt-select-box.wgt-has-error select,.wgt-modal .wgt-select-box.wgt-has-error select {
        color: #f80c0c!important
    }
    
    .wgt-container .wgt-alert,.wgt-modal .wgt-alert {
        padding: 15px;
        border: 1px solid transparent;
        border-radius: 4px;
        margin: 10px 0
    }
    
    .wgt-container .wgt-alert-danger,.wgt-modal .wgt-alert-danger {
        color: #f80c0c;
        background-color: #f2dede;
        border-color: #f80c0c
    }
    
    .wgt-container button,.wgt-modal button {
        padding: 0 1em
    }
    
    .wgt-container #age,.wgt-modal #age {
        margin-right: 10px
    }
    
    .wgt-container .wgt-tarif-box,.wgt-modal .wgt-tarif-box {
        position: relative;
        border: 1px solid #d2d2d2
    }
    
    .wgt-container .wgt-tarif-box h5,.wgt-modal .wgt-tarif-box h5 {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 20px
    }
    
    .wgt-container .wgt-tarif-cover,.wgt-modal .wgt-tarif-cover {
        background: #fff;
        padding: 15px;
        text-align: center;
        width: 100%
    }
    
    .wgt-container .wgt-tarif-cover ul,.wgt-modal .wgt-tarif-cover ul {
        padding: 0;
        margin: 0 0 25px;
        list-style: none
    }
    
    .wgt-container .wgt-tarif-cover ul li,.wgt-modal .wgt-tarif-cover ul li {
        display: inline-block;
        background-color: #2574be;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        position: relative;
        margin: 3px
    }
    
    .wgt-container .wgt-tarif-cover ul li img,.wgt-container .wgt-tarif-cover ul li svg,.wgt-modal .wgt-tarif-cover ul li img,.wgt-modal .wgt-tarif-cover ul li svg {
        max-width: 66.6667%;
        max-height: 66.6667%;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%)
    }
    
    .wgt-container .wgt-tarif-cover i,.wgt-modal .wgt-tarif-cover i {
        margin-right: 10px
    }
    
    .wgt-container .wgt-tarif-cover button,.wgt-modal .wgt-tarif-cover button {
        min-width: 150px
    }
    
    .wgt-container .wgt-tarif-cover .wgt-active i,.wgt-modal .wgt-tarif-cover .wgt-active i {
        color: #0d785a
    }
    
    .wgt-container .wgt-tarif-cover .wgt-disabled,.wgt-container .wgt-tarif-cover .wgt-disabled i,.wgt-modal .wgt-tarif-cover .wgt-disabled,.wgt-modal .wgt-tarif-cover .wgt-disabled i {
        color: #bababa
    }
    
    .wgt-container {
        position: relative
    }
    
    .wgt-container .wgt-tarif-info {
        padding: 15px 0
    }
    
    .wgt-container .wgt-tarif-info i {
        color: #0d785a;
        margin-right: 10px
    }
    
    .wgt-container .wgt-tarif-wrap {
        padding: 15px
    }
    
    .wgt-container .wgt-tarif-wrap h3 {
        margin: 0 0 5px;
        color: #2574be;
        font-size: 16px;
        font-weight: 700
    }
    
    .wgt-container .wgt-tarif-wrap p {
        color: #2574be;
        font-size: 16px
    }
    
    .wgt-container .wgt-tarif-wrap p span {
        color: #b8b8b8
    }
    
    .wgt-container .wgt-tarif-wrap button {
        width: 45%
    }
    
    .wgt-container .wgt-tarif-wrap .wgt-btn-blue,.wgt-container .wgt-tarif-wrap .wgt-btn-red {
        margin-right: 15px
    }
    
    .wgt-container .wgt-tarif-tuev {
        text-align: center
    }
    
    .wgt-container .wgt-tarif-tuev>img {
        margin: 0 auto
    }
    
    .wgt-container .wgt-tarif-options {
        border: 1px solid #d2d2d2;
        border-top: 5px solid #2574be;
        background: #fff;
        overflow: hidden;
        margin-top: 15px
    }
    
    .wgt-container .wgt-tarif-processing {
        display: none;
        position: absolute;
        z-index: 9;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: url(https://wwwapi.serviceeu.com/rt/img/processing.gif) center center no-repeat rgba(99,99,99,.5)
    }
    
    .wgt-container.wgt-full .wgt-row-eq-height,.wgt-container.wgt-full .wgt-row-eq-height .wgt-col-sm-3,.wgt-container.wgt-full .wgt-row-eq-height .wgt-col-sm-4,.wgt-container.wgt-full .wgt-row-eq-height .wgt-col-sm-5,.wgt-container.wgt-full .wgt-row-eq-height .wgt-col-sm-7,.wgt-container.wgt-medium .wgt-row-eq-height,.wgt-container.wgt-medium .wgt-row-eq-height .wgt-col-sm-3,.wgt-container.wgt-medium .wgt-row-eq-height .wgt-col-sm-4,.wgt-container.wgt-medium .wgt-row-eq-height .wgt-col-sm-5,.wgt-container.wgt-medium .wgt-row-eq-height .wgt-col-sm-7 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex
    }
    
    .wgt-container.wgt-full .wgt-row-eq-height .wgt-col-sm-3.wgt-table,.wgt-container.wgt-full .wgt-row-eq-height .wgt-col-sm-4.wgt-table,.wgt-container.wgt-full .wgt-row-eq-height .wgt-col-sm-5.wgt-table,.wgt-container.wgt-full .wgt-row-eq-height .wgt-col-sm-7.wgt-table,.wgt-container.wgt-medium .wgt-row-eq-height .wgt-col-sm-3.wgt-table,.wgt-container.wgt-medium .wgt-row-eq-height .wgt-col-sm-4.wgt-table,.wgt-container.wgt-medium .wgt-row-eq-height .wgt-col-sm-5.wgt-table,.wgt-container.wgt-medium .wgt-row-eq-height .wgt-col-sm-7.wgt-table {
        align-items: center!important
    }
    
    .wgt-container.wgt-full .wgt-tarif-price-box,.wgt-container.wgt-medium .wgt-tarif-price-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%)
    }
    
    .wgt-container.wgt-full .wgt-tarif-price-box .wgt-btn-red,.wgt-container.wgt-medium .wgt-tarif-price-box .wgt-btn-red {
        width: 25%;
        min-width: 150px
    }
    
    .wgt-container.wgt-full .wgt-blue-box,.wgt-container.wgt-medium .wgt-blue-box {
        background: #2574be;
        color: #fff;
        padding: 7px 15px;
        margin-top: 15px
    }
    
    .wgt-container.wgt-full .wgt-blue-box.wgt-box-small,.wgt-container.wgt-medium .wgt-blue-box.wgt-box-small {
        padding: 8px 15px
    }
    
    .wgt-container.wgt-full .wgt-blue-box h4,.wgt-container.wgt-medium .wgt-blue-box h4 {
        font-size: 18px
    }
    
    .wgt-container.wgt-full .wgt-blue-box p,.wgt-container.wgt-medium .wgt-blue-box p {
        margin: 5px 0
    }
    
    .wgt-container.wgt-full .wgt-blue-box button.wgt-btn-white,.wgt-container.wgt-medium .wgt-blue-box button.wgt-btn-white {
        width: 180px;
        display: block;
        padding: 0;
        margin: 12px 15px 12px 12px;
        float: right
    }
    
    .wgt-container.wgt-full .wgt-white-box,.wgt-container.wgt-medium .wgt-white-box {
        padding: 15px;
        border: 1px solid #d2d2d2;
        margin-bottom: 15px
    }
    
    .wgt-container.wgt-full .wgt-white-box.wgt-np,.wgt-container.wgt-medium .wgt-white-box.wgt-np {
        padding: 0 15px
    }
    
    .wgt-container.wgt-full .wgt-white-box h5,.wgt-container.wgt-medium .wgt-white-box h5 {
        color: #2574be;
        font-size: 16px;
        font-weight: 400
    }
    
    .wgt-container.wgt-full .wgt-white-box .wgt-btn-red,.wgt-container.wgt-medium .wgt-white-box .wgt-btn-red {
        width: 121px;
        margin-top: 0;
        margin-bottom: 15px
    }
    
    .wgt-container.wgt-full .wgt-white-box .wgt-select-box,.wgt-container.wgt-medium .wgt-white-box .wgt-select-box {
        border: 1px solid #e5e5e5
    }
    
    .wgt-container.wgt-full .wgt-white-box .wgt-tarif-select,.wgt-container.wgt-medium .wgt-white-box .wgt-tarif-select {
        border: 0
    }
    
    .wgt-container.wgt-full .wgt-white-box .wgt-tarif-select input[type=text],.wgt-container.wgt-medium .wgt-white-box .wgt-tarif-select input[type=text] {
        border: 1px solid #e5e5e5;
        width: 100%
    }
    
    .wgt-container.wgt-full .wgt-white-box .wgt-tarif-select input[type=checkbox],.wgt-container.wgt-medium .wgt-white-box .wgt-tarif-select input[type=checkbox] {
        width: auto
    }
    
    .wgt-container.wgt-full .wgt-white-box span.wgt-blue,.wgt-container.wgt-medium .wgt-white-box span.wgt-blue {
        color: #2574be;
        font-size: 16px;
        padding-top: 40px;
        display: block;
        font-weight: 700
    }
    
    .wgt-container.wgt-full .wgt-white-box .wgt-tarif-price,.wgt-container.wgt-medium .wgt-white-box .wgt-tarif-price {
        text-align: center;
        padding: 0;
        min-height: 0
    }
    
    .wgt-container.wgt-full .wgt-col-sm-push-9,.wgt-container.wgt-medium .wgt-col-sm-push-9 {
        left: 66.66666666666666%
    }
    
    .wgt-container.wgt-full .wgt-col-sm-pull-8,.wgt-container.wgt-medium .wgt-col-sm-pull-8 {
        right: 66.66666666666666%
    }
    
    .wgt-container.wgt-full .wgt-col-sm-push-1,.wgt-container.wgt-medium .wgt-col-sm-push-1 {
        left: 0
    }
    
    .wgt-container.wgt-full .wgt-col-sm-5,.wgt-container.wgt-medium .wgt-col-sm-5 {
        width: 41.66666666666667%
    }
    
    .wgt-container.wgt-full .wgt-col-sm-4,.wgt-container.wgt-medium .wgt-col-sm-4 {
        width: 33.33333333333333%
    }
    
    .wgt-container.wgt-full .wgt-col-sm-3,.wgt-container.wgt-medium .wgt-col-sm-3 {
        width: 25%
    }
    
    .wgt-container.wgt-full .wgt-col-sm-7,.wgt-container.wgt-medium .wgt-col-sm-7 {
        width: 58.33333333333333%
    }
    
    .wgt-container.wgt-full .wgt-col-sm-8,.wgt-container.wgt-medium .wgt-col-sm-8 {
        width: 66.66666666666666%
    }
    
    .wgt-container.wgt-full .wgt-col-sm-9,.wgt-container.wgt-medium .wgt-col-sm-9 {
        width: 75%
    }
    
    .wgt-container.wgt-full .wgt-tarif-box .wgt-nav-tabs li,.wgt-container.wgt-medium .wgt-tarif-box .wgt-nav-tabs li {
        width: 25%
    }
    
    .wgt-container.wgt-full .wgt-tarif-info,.wgt-container.wgt-medium .wgt-tarif-info {
        text-align: center;
        padding-top: 0
    }
    
    .wgt-container.wgt-full .wgt-tarif-select,.wgt-container.wgt-medium .wgt-tarif-select {
        margin-top: 0
    }
    
    .wgt-container.wgt-full .wgt-table,.wgt-container.wgt-medium .wgt-table {
        display: table
    }
    
    .wgt-container.wgt-full .wgt-tarif-price p,.wgt-container.wgt-medium .wgt-tarif-price p {
        margin-bottom: 0
    }
    
    .wgt-container.wgt-full .wgt-tab-content .wgt-btn-blue.wgt-pull-down-1,.wgt-container.wgt-medium .wgt-tab-content .wgt-btn-blue.wgt-pull-down-1 {
        margin-top: 45px
    }
    
    .wgt-container.wgt-full .wgt-tab-content .wgt-btn-blue.wgt-pull-down-2,.wgt-container.wgt-medium .wgt-tab-content .wgt-btn-blue.wgt-pull-down-2 {
        margin-top: 85px
    }
    
    .wgt-container.wgt-full .wgt-tarif-cover,.wgt-container.wgt-medium .wgt-tarif-cover {
        min-height: 173px
    }
    
    .wgt-container.wgt-full .wgt-tarif-cover ul,.wgt-container.wgt-medium .wgt-tarif-cover ul {
        margin: 0
    }
    
    .wgt-container.wgt-full .wgt-tarif-cover .wgt-btn-tarifinfo,.wgt-container.wgt-medium .wgt-tarif-cover .wgt-btn-tarifinfo {
        margin-top: 25px
    }
    
    .wgt-container.wgt-full.wgt-full .wgt-tab-content .wgt-form,.wgt-container.wgt-medium.wgt-full .wgt-tab-content .wgt-form {
        padding-left: 50px
    }
    
    .wgt-container .wgt-mt35 {
        margin-top: 35px!important
    }
    
    .wgt-container .wgt-documents p {
        display: block;
        margin: 2em 0
    }
    
    .wgt-container .wgt-documents p .wgt-btn-white {
        padding: .5em 1em;
        text-decoration: none
    }
    
    .wgt-modal {
        display: none;
        overflow: hidden;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        -webkit-overflow-scrolling: touch
    }
    
    .wgt-modal.wgt-fade .wgt-modal-dialog {
        -webkit-transform: translate3d(0,-25%,0);
        transform: translate3d(0,-25%,0);
        -webkit-transition: -webkit-transform .3s ease-out;
        -moz-transition: -moz-transform .3s ease-out;
        -o-transition: -o-transform .3s ease-out;
        transition: transform .3s ease-out
    }
    
    .wgt-modal.wgt-in .wgt-modal-dialog {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0)
    }
    
    .wgt-modal .wgt-close {
        padding: 0;
        cursor: pointer;
        background: 0 0;
        border: 0;
        -webkit-appearance: none;
        float: right;
        font-size: 21px;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        -moz-opacity: .2;
        -khtml-opacity: .2;
        -webkit-opacity: .2;
        opacity: .2;
        -ms-filter: alpha(opacity=20);
        filter: alpha(opacity=20)
    }
    
    .transition(all 0.3s ease) .wgt-modal .wgt-close:hover {
        -moz-opacity: .5;
        -khtml-opacity: .5;
        -webkit-opacity: .5;
        opacity: .5;
        -ms-filter: alpha(opacity=50);
        filter: alpha(opacity=50)
    }
    
    .wgt-modal .wgt-sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0
    }
    
    .wgt-modal .wgt-modal-body {
        padding: 0 15px;
        position: relative
    }
    
    .wgt-modal .wgt-tarif-banner {
        width: 100%
    }
    
    .wgt-modal .wgt-modal-header {
        padding: 15px;
        min-height: 16.43px
    }
    
    .wgt-modal .wgt-modal-header .close {
        font-size: 25px
    }
    
    .wgt-modal .wgt-modal-title {
        margin: 0;
        line-height: 1.428571429
    }
    
    .wgt-modal .wgt-modal-footer {
        padding: 0 15px 15px;
        text-align: right
    }
    
    .wgt-modal .wgt-modal-footer a {
        color: #9c9c9c;
        cursor: pointer
    }
    
    .wgt-modal .wgt-modal-footer .wgt-btn+.wgt-btn {
        margin-left: 5px;
        margin-bottom: 0
    }
    
    .wgt-modal .wgt-modal-footer .wgt-btn-group .wgt-btn+.wgt-btn {
        margin-left: -1px
    }
    
    .wgt-modal .wgt-modal-footer .wgt-btn-block+.wgt-btn-block {
        margin-left: 0
    }
    
    .wgt-modal .wgt-modal-scrollbar-measure {
        position: absolute;
        top: -9999px;
        width: 50px;
        height: 50px;
        overflow: none
    }
    
    .wgt-modal .wgt-modal-dialog {
        position: relative;
        width: auto;
        margin: 10px
    }
    
    .wgt-modal .wgt-modal-content {
        position: relative;
        background-color: #fff;
        border: 1px solid #999;
        -webkit-box-shadow: 0 3px 9px rgba(0,0,0,.5);
        box-shadow: 0 3px 9px rgba(0,0,0,.5);
        background-clip: padding-box
    }
    
    .wgt-modal .datepicker-dropdown:after,.wgt-modal .datepicker-dropdown:before {
        content: '';
        display: inline-block;
        border-top: 0;
        position: absolute
    }
    
    .wgt-modal .wgt-tarif-price {
        background: #333;
        text-align: center;
        padding: 20px;
        width: 100%;
        min-height: 213px
    }
    
    .wgt-modal .wgt-tarif-price p {
        font-size: 76px;
        color: #fff;
        margin: 0
    }
    
    .wgt-modal .wgt-tarif-price span {
        color: #fff;
        font-style: italic
    }
    
    .wgt-modal .wgt-tarif-price sup:first-child {
        font-size: 30px;
        top: -34px;
        margin-right: 10px
    }
    
    .wgt-modal .wgt-tarif-price sup:nth-child(2) {
        font-size: 30px;
        top: -30px;
        left: 10px
    }
    
    .wgt-modal .wgt-tarif-price sup:last-child {
        font-size: 14px;
        top: 0;
        left: -17px
    }
    
    .wgt-modal .datepicker {
        padding: 4px;
        border-radius: 4px;
        direction: ltr
    }
    
    .wgt-modal .datepicker-inline {
        width: 220px
    }
    
    .wgt-modal .datepicker.wgt-modal .datepicker-rtl {
        direction: rtl
    }
    
    .wgt-modal .datepicker.wgt-modal .datepicker-rtl table tr td span {
        float: right
    }
    
    .wgt-modal .datepicker-dropdown {
        top: 0;
        left: 0
    }
    
    .wgt-modal .datepicker-dropdown:before {
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #999;
        border-bottom-color: rgba(0,0,0,.2)
    }
    
    .wgt-modal .datepicker-dropdown:after {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #fff
    }
    
    .wgt-modal .datepicker-dropdown.datepicker-orient-left:before {
        left: 6px
    }
    
    .wgt-modal .datepicker-dropdown.datepicker-orient-left:after {
        left: 7px
    }
    
    .wgt-modal .datepicker-dropdown.datepicker-orient-right:before {
        right: 6px
    }
    
    .wgt-modal .datepicker-dropdown.datepicker-orient-right:after {
        right: 7px
    }
    
    .wgt-modal .datepicker-dropdown.datepicker-orient-bottom:before {
        top: -7px
    }
    
    .wgt-modal .datepicker-dropdown.datepicker-orient-bottom:after {
        top: -6px
    }
    
    .wgt-modal .datepicker-dropdown.datepicker-orient-top:before {
        bottom: -7px;
        border-bottom: 0;
        border-top: 7px solid #999
    }
    
    .wgt-modal .datepicker-dropdown.datepicker-orient-top:after {
        bottom: -6px;
        border-bottom: 0;
        border-top: 6px solid #fff
    }
    
    .wgt-modal .datepicker table {
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }
    
    .wgt-modal .datepicker td,.wgt-modal .datepicker th {
        text-align: center;
        width: 20px;
        height: 20px;
        border: none
    }
    
    .table-striped .wgt-modal .datepicker table tr td,.table-striped .wgt-modal .datepicker table tr th {
        background-color: transparent
    }
    
    .wgt-modal .datepicker table tr td.day.focused,.wgt-modal .datepicker table tr td.day:hover {
        background: #eee;
        cursor: pointer
    }
    
    .wgt-modal .datepicker table tr td.new,.wgt-modal .datepicker table tr td.old {
        color: #999
    }
    
    .wgt-modal .datepicker table tr td.disabled,.wgt-modal .datepicker table tr td.disabled:hover {
        background: 0 0;
        color: #999;
        cursor: default
    }
    
    .wgt-modal .datepicker table tr td.highlighted {
        background: #d9edf7;
        border-radius: 0
    }
    
    .wgt-modal .datepicker table tr td.today,.wgt-modal .datepicker table tr td.today.disabled,.wgt-modal .datepicker table tr td.today.disabled:hover,.wgt-modal .datepicker table tr td.today:hover {
        background-color: #fde19a;
        background-image: -moz-linear-gradient(to bottom,#fdd49a,#fdf59a);
        background-image: -ms-linear-gradient(to bottom,#fdd49a,#fdf59a);
        background-image: -webkit-gradient(linear,0 0,0 100%,from(#fdd49a),to(#fdf59a));
        background-image: -webkit-linear-gradient(to bottom,#fdd49a,#fdf59a);
        background-image: -o-linear-gradient(to bottom,#fdd49a,#fdf59a);
        background-image: linear-gradient(to bottom,#fdd49a,#fdf59a);
        background-repeat: repeat-x;
        border-color: #fdf59a #fdf59a #fbed50;
        border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
        color: #000
    }
    
    .wgt-modal .datepicker table tr td.today.active,.wgt-modal .datepicker table tr td.today.disabled,.wgt-modal .datepicker table tr td.today.disabled.active,.wgt-modal .datepicker table tr td.today.disabled.disabled,.wgt-modal .datepicker table tr td.today.disabled:active,.wgt-modal .datepicker table tr td.today.disabled:hover,.wgt-modal .datepicker table tr td.today.disabled:hover.active,.wgt-modal .datepicker table tr td.today.disabled:hover.disabled,.wgt-modal .datepicker table tr td.today.disabled:hover:active,.wgt-modal .datepicker table tr td.today.disabled:hover:hover,.wgt-modal .datepicker table tr td.today.disabled:hover[disabled],.wgt-modal .datepicker table tr td.today.disabled[disabled],.wgt-modal .datepicker table tr td.today:active,.wgt-modal .datepicker table tr td.today:hover,.wgt-modal .datepicker table tr td.today:hover.active,.wgt-modal .datepicker table tr td.today:hover.disabled,.wgt-modal .datepicker table tr td.today:hover:active,.wgt-modal .datepicker table tr td.today:hover:hover,.wgt-modal .datepicker table tr td.today:hover[disabled],.wgt-modal .datepicker table tr td.today[disabled] {
        background-color: #fdf59a
    }
    
    .wgt-modal .datepicker table tr td.today.active,.wgt-modal .datepicker table tr td.today.disabled.active,.wgt-modal .datepicker table tr td.today.disabled:active,.wgt-modal .datepicker table tr td.today.disabled:hover.active,.wgt-modal .datepicker table tr td.today.disabled:hover:active,.wgt-modal .datepicker table tr td.today:active,.wgt-modal .datepicker table tr td.today:hover.active,.wgt-modal .datepicker table tr td.today:hover:active {
        background-color: #fbf069\\9
    }
    
    .wgt-modal .datepicker table tr td.today:hover:hover {
        color: #000
    }
    
    .wgt-modal .datepicker table tr td.today.active:hover {
        color: #fff
    }
    
    .wgt-modal .datepicker table tr td.range,.wgt-modal .datepicker table tr td.range.disabled,.wgt-modal .datepicker table tr td.range.disabled:hover,.wgt-modal .datepicker table tr td.range:hover {
        background: #eee;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0
    }
    
    .wgt-modal .datepicker table tr td.range.today,.wgt-modal .datepicker table tr td.range.today.disabled,.wgt-modal .datepicker table tr td.range.today.disabled:hover,.wgt-modal .datepicker table tr td.range.today:hover {
        background-color: #f3d17a;
        background-image: -moz-linear-gradient(to bottom,#f3c17a,#f3e97a);
        background-image: -ms-linear-gradient(to bottom,#f3c17a,#f3e97a);
        background-image: -webkit-gradient(linear,0 0,0 100%,from(#f3c17a),to(#f3e97a));
        background-image: -webkit-linear-gradient(to bottom,#f3c17a,#f3e97a);
        background-image: -o-linear-gradient(to bottom,#f3c17a,#f3e97a);
        background-image: linear-gradient(to bottom,#f3c17a,#f3e97a);
        background-repeat: repeat-x;
        border-color: #f3e97a #f3e97a #edde34;
        border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0
    }
    
    .wgt-modal .datepicker table tr td.range.today.active,.wgt-modal .datepicker table tr td.range.today.disabled,.wgt-modal .datepicker table tr td.range.today.disabled.active,.wgt-modal .datepicker table tr td.range.today.disabled.disabled,.wgt-modal .datepicker table tr td.range.today.disabled:active,.wgt-modal .datepicker table tr td.range.today.disabled:hover,.wgt-modal .datepicker table tr td.range.today.disabled:hover.active,.wgt-modal .datepicker table tr td.range.today.disabled:hover.disabled,.wgt-modal .datepicker table tr td.range.today.disabled:hover:active,.wgt-modal .datepicker table tr td.range.today.disabled:hover:hover,.wgt-modal .datepicker table tr td.range.today.disabled:hover[disabled],.wgt-modal .datepicker table tr td.range.today.disabled[disabled],.wgt-modal .datepicker table tr td.range.today:active,.wgt-modal .datepicker table tr td.range.today:hover,.wgt-modal .datepicker table tr td.range.today:hover.active,.wgt-modal .datepicker table tr td.range.today:hover.disabled,.wgt-modal .datepicker table tr td.range.today:hover:active,.wgt-modal .datepicker table tr td.range.today:hover:hover,.wgt-modal .datepicker table tr td.range.today:hover[disabled],.wgt-modal .datepicker table tr td.range.today[disabled] {
        background-color: #f3e97a
    }
    
    .wgt-modal .datepicker table tr td.range.today.active,.wgt-modal .datepicker table tr td.range.today.disabled.active,.wgt-modal .datepicker table tr td.range.today.disabled:active,.wgt-modal .datepicker table tr td.range.today.disabled:hover.active,.wgt-modal .datepicker table tr td.range.today.disabled:hover:active,.wgt-modal .datepicker table tr td.range.today:active,.wgt-modal .datepicker table tr td.range.today:hover.active,.wgt-modal .datepicker table tr td.range.today:hover:active {
        background-color: #efe24b\\9
    }
    
    .wgt-modal .datepicker table tr td.selected,.wgt-modal .datepicker table tr td.selected.disabled,.wgt-modal .datepicker table tr td.selected.disabled:hover,.wgt-modal .datepicker table tr td.selected:hover {
        background-color: #9e9e9e;
        background-image: -moz-linear-gradient(to bottom,#b3b3b3,grey);
        background-image: -ms-linear-gradient(to bottom,#b3b3b3,grey);
        background-image: -webkit-gradient(linear,0 0,0 100%,from(#b3b3b3),to(grey));
        background-image: -webkit-linear-gradient(to bottom,#b3b3b3,grey);
        background-image: -o-linear-gradient(to bottom,#b3b3b3,grey);
        background-image: linear-gradient(to bottom,#b3b3b3,grey);
        background-repeat: repeat-x;
        border-color: grey grey #595959;
        border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
        color: #fff;
        text-shadow: 0 -1px 0 rgba(0,0,0,.25)
    }
    
    .wgt-modal .datepicker table tr td.selected.active,.wgt-modal .datepicker table tr td.selected.disabled,.wgt-modal .datepicker table tr td.selected.disabled.active,.wgt-modal .datepicker table tr td.selected.disabled.disabled,.wgt-modal .datepicker table tr td.selected.disabled:active,.wgt-modal .datepicker table tr td.selected.disabled:hover,.wgt-modal .datepicker table tr td.selected.disabled:hover.active,.wgt-modal .datepicker table tr td.selected.disabled:hover.disabled,.wgt-modal .datepicker table tr td.selected.disabled:hover:active,.wgt-modal .datepicker table tr td.selected.disabled:hover:hover,.wgt-modal .datepicker table tr td.selected.disabled:hover[disabled],.wgt-modal .datepicker table tr td.selected.disabled[disabled],.wgt-modal .datepicker table tr td.selected:active,.wgt-modal .datepicker table tr td.selected:hover,.wgt-modal .datepicker table tr td.selected:hover.active,.wgt-modal .datepicker table tr td.selected:hover.disabled,.wgt-modal .datepicker table tr td.selected:hover:active,.wgt-modal .datepicker table tr td.selected:hover:hover,.wgt-modal .datepicker table tr td.selected:hover[disabled],.wgt-modal .datepicker table tr td.selected[disabled] {
        background-color: grey
    }
    
    .wgt-modal .datepicker table tr td.selected.active,.wgt-modal .datepicker table tr td.selected.disabled.active,.wgt-modal .datepicker table tr td.selected.disabled:active,.wgt-modal .datepicker table tr td.selected.disabled:hover.active,.wgt-modal .datepicker table tr td.selected.disabled:hover:active,.wgt-modal .datepicker table tr td.selected:active,.wgt-modal .datepicker table tr td.selected:hover.active,.wgt-modal .datepicker table tr td.selected:hover:active {
        background-color: #666\\9
    }
    
    .wgt-modal .datepicker table tr td.active,.wgt-modal .datepicker table tr td.active.disabled,.wgt-modal .datepicker table tr td.active.disabled:hover,.wgt-modal .datepicker table tr td.active:hover {
        background-color: #006dcc;
        background-image: -moz-linear-gradient(to bottom,#08c,#04c);
        background-image: -ms-linear-gradient(to bottom,#08c,#04c);
        background-image: -webkit-gradient(linear,0 0,0 100%,from(#08c),to(#04c));
        background-image: -webkit-linear-gradient(to bottom,#08c,#04c);
        background-image: -o-linear-gradient(to bottom,#08c,#04c);
        background-image: linear-gradient(to bottom,#08c,#04c);
        background-repeat: repeat-x;
        border-color: #04c #04c #002a80;
        border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
        color: #fff;
        text-shadow: 0 -1px 0 rgba(0,0,0,.25)
    }
    
    .wgt-modal .datepicker table tr td.active.active,.wgt-modal .datepicker table tr td.active.disabled,.wgt-modal .datepicker table tr td.active.disabled.active,.wgt-modal .datepicker table tr td.active.disabled.disabled,.wgt-modal .datepicker table tr td.active.disabled:active,.wgt-modal .datepicker table tr td.active.disabled:hover,.wgt-modal .datepicker table tr td.active.disabled:hover.active,.wgt-modal .datepicker table tr td.active.disabled:hover.disabled,.wgt-modal .datepicker table tr td.active.disabled:hover:active,.wgt-modal .datepicker table tr td.active.disabled:hover:hover,.wgt-modal .datepicker table tr td.active.disabled:hover[disabled],.wgt-modal .datepicker table tr td.active.disabled[disabled],.wgt-modal .datepicker table tr td.active:active,.wgt-modal .datepicker table tr td.active:hover,.wgt-modal .datepicker table tr td.active:hover.active,.wgt-modal .datepicker table tr td.active:hover.disabled,.wgt-modal .datepicker table tr td.active:hover:active,.wgt-modal .datepicker table tr td.active:hover:hover,.wgt-modal .datepicker table tr td.active:hover[disabled],.wgt-modal .datepicker table tr td.active[disabled] {
        background-color: #04c
    }
    
    .wgt-modal .datepicker table tr td.active.active,.wgt-modal .datepicker table tr td.active.disabled.active,.wgt-modal .datepicker table tr td.active.disabled:active,.wgt-modal .datepicker table tr td.active.disabled:hover.active,.wgt-modal .datepicker table tr td.active.disabled:hover:active,.wgt-modal .datepicker table tr td.active:active,.wgt-modal .datepicker table tr td.active:hover.active,.wgt-modal .datepicker table tr td.active:hover:active {
        background-color: #039\\9
    }
    
    .wgt-modal .datepicker table tr td span {
        display: block;
        width: 23%;
        height: 54px;
        line-height: 54px;
        float: left;
        margin: 1%;
        cursor: pointer;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px
    }
    
    .wgt-modal .datepicker table tr td span.focused,.wgt-modal .datepicker table tr td span:hover {
        background: #eee
    }
    
    .wgt-modal .datepicker table tr td span.disabled,.wgt-modal .datepicker table tr td span.disabled:hover {
        background: 0 0;
        color: #999;
        cursor: default
    }
    
    .wgt-modal .datepicker .datepicker-switch,.wgt-modal .datepicker .next,.wgt-modal .datepicker .prev,.wgt-modal .datepicker tfoot tr th,.wgt-modal .input-append.date .add-on,.wgt-modal .input-prepend.date .add-on {
        cursor: pointer
    }
    
    .wgt-modal .datepicker table tr td span.active,.wgt-modal .datepicker table tr td span.active.disabled,.wgt-modal .datepicker table tr td span.active.disabled:hover,.wgt-modal .datepicker table tr td span.active:hover {
        background-color: #006dcc;
        background-image: -moz-linear-gradient(to bottom,#08c,#04c);
        background-image: -ms-linear-gradient(to bottom,#08c,#04c);
        background-image: -webkit-gradient(linear,0 0,0 100%,from(#08c),to(#04c));
        background-image: -webkit-linear-gradient(to bottom,#08c,#04c);
        background-image: -o-linear-gradient(to bottom,#08c,#04c);
        background-image: linear-gradient(to bottom,#08c,#04c);
        background-repeat: repeat-x;
        border-color: #04c #04c #002a80;
        border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
        color: #fff;
        text-shadow: 0 -1px 0 rgba(0,0,0,.25)
    }
    
    .wgt-modal .datepicker table tr td span.active.active,.wgt-modal .datepicker table tr td span.active.disabled,.wgt-modal .datepicker table tr td span.active.disabled.active,.wgt-modal .datepicker table tr td span.active.disabled.disabled,.wgt-modal .datepicker table tr td span.active.disabled:active,.wgt-modal .datepicker table tr td span.active.disabled:hover,.wgt-modal .datepicker table tr td span.active.disabled:hover.active,.wgt-modal .datepicker table tr td span.active.disabled:hover.disabled,.wgt-modal .datepicker table tr td span.active.disabled:hover:active,.wgt-modal .datepicker table tr td span.active.disabled:hover:hover,.wgt-modal .datepicker table tr td span.active.disabled:hover[disabled],.wgt-modal .datepicker table tr td span.active.disabled[disabled],.wgt-modal .datepicker table tr td span.active:active,.wgt-modal .datepicker table tr td span.active:hover,.wgt-modal .datepicker table tr td span.active:hover.active,.wgt-modal .datepicker table tr td span.active:hover.disabled,.wgt-modal .datepicker table tr td span.active:hover:active,.wgt-modal .datepicker table tr td span.active:hover:hover,.wgt-modal .datepicker table tr td span.active:hover[disabled],.wgt-modal .datepicker table tr td span.active[disabled] {
        background-color: #04c
    }
    
    .wgt-modal .datepicker table tr td span.active.active,.wgt-modal .datepicker table tr td span.active.disabled.active,.wgt-modal .datepicker table tr td span.active.disabled:active,.wgt-modal .datepicker table tr td span.active.disabled:hover.active,.wgt-modal .datepicker table tr td span.active.disabled:hover:active,.wgt-modal .datepicker table tr td span.active:active,.wgt-modal .datepicker table tr td span.active:hover.active,.wgt-modal .datepicker table tr td span.active:hover:active {
        background-color: #039\\9
    }
    
    .wgt-modal .datepicker table tr td span.new,.wgt-modal .datepicker table tr td span.old {
        color: #999
    }
    
    .wgt-modal .datepicker .datepicker-switch {
        width: 145px
    }
    
    .wgt-modal .datepicker .datepicker-switch:hover,.wgt-modal .datepicker .next:hover,.wgt-modal .datepicker .prev:hover,.wgt-modal .datepicker tfoot tr th:hover {
        background: #eee
    }
    
    .wgt-modal .datepicker .next.disabled,.wgt-modal .datepicker .prev.disabled {
        visibility: hidden
    }
    
    .wgt-modal .datepicker .cw {
        font-size: 10px;
        width: 12px;
        padding: 0 2px 0 5px;
        vertical-align: middle
    }
    
    .wgt-modal .input-append.date .add-on i,.wgt-modal .input-prepend.date .add-on i {
        margin-top: 3px
    }
    
    .wgt-modal .input-daterange input {
        text-align: center
    }
    
    .wgt-modal .input-daterange input:first-child {
        -webkit-border-radius: 3px 0 0 3px;
        -moz-border-radius: 3px 0 0 3px;
        border-radius: 3px 0 0 3px
    }
    
    .wgt-modal .input-daterange input:last-child {
        -webkit-border-radius: 0 3px 3px 0;
        -moz-border-radius: 0 3px 3px 0;
        border-radius: 0 3px 3px 0
    }
    
    .wgt-modal .input-daterange .add-on {
        display: inline-block;
        width: auto;
        min-width: 16px;
        height: 18px;
        padding: 4px 5px;
        font-weight: 400;
        line-height: 18px;
        text-align: center;
        text-shadow: 0 1px 0 #fff;
        vertical-align: middle;
        background-color: #eee;
        border: 1px solid #ccc;
        margin-left: -5px;
        margin-right: -5px
    }
    
    @media (min-width: 768px) {
        .wgt-modal .wgt-modal-dialog {
            width:572px;
            margin: 30px auto
        }
    
        .wgt-modal .wgt-modal-content {
            -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
            box-shadow: 0 5px 15px rgba(0,0,0,.5)
        }
    
        .wgt-modal .wgt-nav-tabs li {
            width: 25%
        }
    }
    
    @media (min-width: 992px) {
        .wgt-modal .wgt-modal-dialog {
            width:572px;
            margin: 30px auto
        }
    
        .wgt-modal .wgt-modal-lg {
            width: 900px
        }
    
        .wgt-modal .wgt-col-sm-push-9 {
            left: 75%
        }
    
        .wgt-modal .wgt-col-sm-pull-8 {
            right: 66.66666666666666%
        }
    
        .wgt-modal .wgt-col-sm-push-1 {
            left: 8.333333333333332%
        }
    
        .wgt-modal .wgt-col-sm-5 {
            width: 41.66666666666667%
        }
    
        .wgt-modal .wgt-col-sm-4 {
            width: 33.33333333333333%
        }
    
        .wgt-modal .wgt-col-sm-3 {
            width: 25%
        }
    
        .wgt-modal .wgt-col-sm-7 {
            width: 58.99999999999999%
        }
    
        .wgt-modal .wgt-col-sm-8 {
            width: 66.66666666666666%
        }
    
        .wgt-modal .wgt-col-sm-9 {
            width: 75%
        }
    }
    
    .wgt-modal-open {
        overflow: hidden
    }
    
    .wgt-modal-open .wgt-modal {
        overflow-x: hidden;
        overflow-y: auto
    }
    
    .wgt-modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #2574be
    }
    
    .wgt-modal-backdrop.wgt-fade {
        opacity: 0;
        filter: alpha(opacity=0)
    }
    
    .wgt-modal-backdrop.wgt-in {
        opacity: .8;
        filter: alpha(opacity=80)
    }
`;