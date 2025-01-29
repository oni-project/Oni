export const html = /*html*/`
<mdui-top-app-bar variant="medium" scroll-behavior="shrink elevate" scroll-target="#main-content-area">

  <img src="resources/icon.png" style="height: 100%; margin-left: 0.5rem; margin-right: 0.5rem;opacity: 0.7;" />

  <mdui-top-app-bar-title>
    <div style="display: flex;flex-direction: row;">
      <div style="font-weight: bolder;">ONi</div>
      &nbsp;
      <mdui-badge>Next+</mdui-badge>
    </div>
    <div id="navi-label" slot="label-large" style="font-weight: bold;height: 100%;font-size: 2rem;margin-left: 3rem;opacity: 0.9;"></div>
  </mdui-top-app-bar-title>


  <div style="flex-grow: 1"></div>

  <div style="align-self: center; opacity: 0.2;" id="slogan"></div>

  <mdui-button-icon icon="menu" id="navi-toggler" onclick="toggleLeftNavi()"></mdui-button-icon>

</mdui-top-app-bar>
`

export function init() {
  function isMobileDevice() {
    const ua = navigator.userAgent.toLowerCase()
    const kw = ['iphone', 'ipod', 'android', 'windows phone', 'blackberry', 'mobile']
    return kw.some(keyword => ua.includes(keyword))
  }
  if (!isMobileDevice()) {
    const slogan = ["豆！豆！痛いよ！", "人間！妖怪！誰でも歓迎！"]
    let elem = document.getElementById("slogan")!
    elem.innerText = `"${slogan[Math.floor(Math.random() * slogan.length)]}"`
  }
}