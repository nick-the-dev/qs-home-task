const products = {
  1: {
    retailPrice: "58.00",
    price: "39.95",
    subscribePrice: "35.95",
    link: "https://www.tracker.com/link-1",
    subscribeLink: "https://www.tracker.com/subscribe-link-1",
  },
  3: {
    retailPrice: "174.00",
    price: "102.00",
    subscribePrice: "91.80",
    link: "https://www.tracker.com/link-3",
    subscribeLink: "https://www.tracker.com/subscribe-link-3",
  },
  6: {
    retailPrice: "348.00",
    price: "186.00",
    subscribePrice: "167.40",
    link: "https://www.tracker.com/link-6",
    subscribeLink: "https://www.tracker.com/subscribe-link-6",
  },
};

const currency = "$";
let isSubscriptionMode = false;

const updatePack = () => {
  const activePack = $(".btn-tab-quantity.active span").text();
  const retailPrice = parseFloat(products[activePack].retailPrice).toFixed(2);
  const price = parseFloat(products[activePack].price).toFixed(2);
  const subscribePrice = parseFloat(
    products[activePack].subscribePrice,
  ).toFixed(2);
  let savings;

  isSubscriptionMode =
    $(".btn-tab-type.active").attr("data-type") === "subscription";

  $(".pack-img.active").removeClass("active");
  $(`.pack-img[data-id=${activePack}]`).addClass("active");

  if (!isSubscriptionMode) {
    savings = (retailPrice - price).toFixed(2);
    $(".pricing .final").text(currency + price);
    $(".buy-btn").attr("href", products[activePack].link);
    if ($(".subscribe").hasClass("shown")) {
      $(".subscribe").removeClass("shown");
    }
    $(".buy-btn").removeClass("disabled");
  } else {
    savings = (retailPrice - subscribePrice).toFixed(2);
    $(".subscribe").addClass("shown");

    $(".pricing .final").text(currency + subscribePrice + "/month");

    if (!$("input#subscribe").is(":checked")) {
      $(".buy-btn").addClass("disabled");
    } else {
      $(".buy-btn").removeClass("disabled");
    }
  }

  $(".pricing .retail .value").text(currency + retailPrice);
  $(".pricing .savings .value").text(currency + savings);
};

$(document).ready(function () {
  // Set viewport height value in css variable
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", "".concat(window.innerHeight, "px"));
  };

  window.addEventListener("resize", appHeight);
  appHeight();

  // Initially set price of current active pack
  updatePack();

  //Event Listeners
  $(".btn-tab").click(function (e) {
    if ($(this).hasClass("btn-tab-quantity")) {
      $(".btn-tab-quantity").removeClass("active");
    } else if ($(this).hasClass("btn-tab-type")) {
      $(".btn-tab-type").removeClass("active");
    }

    $(e.target).addClass("active");
    updatePack();
  });

  $("input#subscribe").change(function () {
    $(".buy-btn").toggleClass("disabled");
  });
});
