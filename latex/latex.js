const config = require("../config");

// 更新公式图片的公共方法
function updateLatexSrc(_ts) {
  let dataAttr = _ts.data.data.attrs;
  if (!dataAttr) return;

  _ts.setData({
    attrs: {
      src: `${config.latex.api}=${dataAttr.value}&theme=${global._theme}`,
      class: `${dataAttr.class} ${dataAttr.class}--${dataAttr.type}`,
    },
  });
}

Component({
  options: {
    styleIsolation: "shared",
  },
  properties: {
    data: {
      type: Object,
      value: {},
    },
  },
  data: {
    attr: {
      src: "",
      class: "",
    },
    size: {
      w: 0,
      h: 0,
    },
  },
  observers: {
    // 当 data 属性变化时重新计算公式图片 URL，解决翻页后公式显示旧内容的问题
    "data.attrs.value": function () {
      updateLatexSrc(this);
    },
  },
  lifetimes: {
    attached: function () {
      updateLatexSrc(this);
    },
  },
  methods: {
    load: function (e) {
      const _ts = this;

      // 公式图片加载完成则根据其图片大小、类型计算其显示的合适大小
      let scale = 20,
        w = e.detail.width / scale,
        h = e.detail.height / scale;

      _ts.setData({
        size: {
          w: w,
          h: h,
        },
      });
    },
  },
});
