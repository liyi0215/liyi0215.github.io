{% if theme.alipay or theme.wechatpay %}
  <div style="padding: 10px 0; margin: 20px auto; width: 90%; text-align: center;">
    <button id="rewardButton" disable="enable" onclick="var qr = document.getElementById('QR'); if (qr.style.display === 'none') {qr.style.display='block';} else {qr.style.display='none'}">
      <span>赏</span>
    </button>
    <div class="content">
      <div class="loader">
        {% if theme.text_bounce %}
          {% for index in theme.reward_comment %}
            <span class="loader_letter">{{index}} </span>
          {% endfor %}
        {% else %}
            {{ theme.reward_comment }}
        {% endif %}
      </div>
    </div> <!-- {{ theme.reward_comment }} -->

    <div id="QR" style="display: none;">
      {% if theme.wechatpay %}
        <div id="wechat" style="display: inline-block">
          <img id="wechat_qr" src="{{ theme.wechatpay }}" alt="{{ theme.author }} WeChat Pay"/>
          <p>微信打赏</p>
        </div>
      {% endif %}
      {% if theme.alipay %}
        <div id="alipay" style="display: inline-block">
          <img id="alipay_qr" src="{{ theme.alipay }}" alt="{{ theme.author }} Alipay"/>
          <p>支付宝打赏</p>
        </div>
      {% endif %}
    </div>
  </div>
{% endif %}
