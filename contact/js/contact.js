/**
 * OtasukeAI Contact Page - Frontend Logic
 */

(function () {
  'use strict';

  // API base URL - configure per environment
  var API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001'
    : 'https://otasuke-ai-backend.onrender.com';

  // State
  var isSubmitting = false;

  // DOM Elements
  var form = document.getElementById('contact-form');
  var formLastName = document.getElementById('form-lastName');
  var formFirstName = document.getElementById('form-firstName');
  var formCompany = document.getElementById('form-company');
  var formEmail = document.getElementById('form-email');
  var formPhone = document.getElementById('form-phone');
  var formInquiryType = document.getElementById('form-inquiryType');
  var formInquiryDetail = document.getElementById('form-inquiryDetail');
  var formPrivacy = document.getElementById('form-privacy');
  var submitBtn = document.getElementById('contact-submit');

  // Validation patterns
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_REGEX = /^[\d\-+() ]{8,20}$/;

  // ---- Form Validation ----

  function clearErrors() {
    var errors = document.querySelectorAll('.form-error');
    for (var i = 0; i < errors.length; i++) {
      errors[i].classList.remove('visible');
    }
    var inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    for (var j = 0; j < inputs.length; j++) {
      inputs[j].classList.remove('error');
    }
  }

  function showError(elementId, message) {
    var el = document.getElementById(elementId);
    var errorEl = el.parentElement.querySelector('.form-error');
    if (el.type !== 'checkbox') {
      el.classList.add('error');
    }
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }

  function validateForm() {
    clearErrors();
    var valid = true;

    if (!formLastName.value.trim()) {
      showError('form-lastName', '姓を入力してください');
      valid = false;
    }
    if (!formFirstName.value.trim()) {
      showError('form-firstName', '名を入力してください');
      valid = false;
    }
    if (!formCompany.value.trim()) {
      showError('form-company', '会社名を入力してください');
      valid = false;
    }
    if (!formEmail.value.trim() || !EMAIL_REGEX.test(formEmail.value)) {
      showError('form-email', '有効なメールアドレスを入力してください');
      valid = false;
    }
    if (!formPhone.value.trim() || !PHONE_REGEX.test(formPhone.value)) {
      showError('form-phone', '有効な電話番号を入力してください');
      valid = false;
    }
    if (!formInquiryType.value) {
      showError('form-inquiryType', 'お問い合わせ種別を選択してください');
      valid = false;
    }
    if (!formInquiryDetail.value.trim()) {
      showError('form-inquiryDetail', 'お問い合わせ内容を入力してください');
      valid = false;
    }
    if (!formPrivacy.checked) {
      showError('form-privacy', '個人情報の取り扱いに同意してください');
      valid = false;
    }

    return valid;
  }

  function getFormData() {
    return {
      lastName: formLastName.value.trim(),
      firstName: formFirstName.value.trim(),
      companyName: formCompany.value.trim(),
      email: formEmail.value.trim(),
      phone: formPhone.value.trim(),
      inquiryType: formInquiryType.value,
      inquiryDetail: formInquiryDetail.value.trim(),
      privacyConsent: formPrivacy.checked
    };
  }

  // ---- Button States ----

  function setLoading(loading) {
    if (loading) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner"></span> 送信中...';
    } else {
      submitBtn.disabled = false;
      if (submitBtn.dataset.originalText) {
        submitBtn.innerHTML = submitBtn.dataset.originalText;
      }
    }
  }

  // ---- Form Reset ----

  function resetForm() {
    formLastName.value = '';
    formFirstName.value = '';
    formCompany.value = '';
    formEmail.value = '';
    formPhone.value = '';
    formInquiryType.value = '';
    formInquiryDetail.value = '';
    formPrivacy.checked = false;
    clearErrors();
  }

  // ---- API Call ----

  function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;

    isSubmitting = true;
    setLoading(true);

    var data = getFormData();

    fetch(API_BASE + '/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.message) {
          showToast(result.message, 'success');
          resetForm();
        } else {
          showToast(result.error || 'お問い合わせの送信に失敗しました', 'error');
        }
        isSubmitting = false;
        setLoading(false);
      })
      .catch(function () {
        showToast('通信エラーが発生しました。しばらく経ってからお試しください。', 'error');
        isSubmitting = false;
        setLoading(false);
      });
  }

  // ---- Toast ----

  function showToast(message, type) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'success');
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 5000);
  }

  // ---- Event Listeners ----

  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', handleSubmit);
  }

})();
