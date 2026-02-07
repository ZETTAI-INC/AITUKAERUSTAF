/**
 * OtasukeAI Payment Page - Frontend Logic
 */

(function () {
  'use strict';

  // API base URL - configure per environment
  var API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001'
    : 'https://otasuke-ai-backend.onrender.com';

  // State
  var selectedPlanId = null;
  var isSubmitting = false;

  // DOM Elements
  var modal = document.getElementById('payment-modal');
  var modalPlanName = document.getElementById('modal-plan-name');
  var modalPlanPrice = document.getElementById('modal-plan-price');
  var paymentMethodsSelect = document.getElementById('payment-methods-select');
  var invoiceForm = document.getElementById('invoice-form');
  var formCompany = document.getElementById('form-company');
  var formName = document.getElementById('form-name');
  var formEmail = document.getElementById('form-email');
  var formPhone = document.getElementById('form-phone');
  var btnCredit = document.getElementById('btn-credit');
  var btnInvoiceSelect = document.getElementById('btn-invoice-select');
  var btnInvoice = document.getElementById('btn-invoice');
  var btnBack = document.getElementById('btn-back');

  // Plan data for modal display
  var planData = {
    light: { name: 'ライトプラン', price: '月額5万円（税別）' },
    standard: { name: 'スタンダードプラン', price: '月額30万円（税別）' },
    premium: { name: 'プレミアムプラン', price: '月額50万円（税別）' }
  };

  // ---- Modal Open/Close ----

  function openModal(planId) {
    selectedPlanId = planId;
    var plan = planData[planId];
    if (!plan) return;

    modalPlanName.textContent = plan.name;
    modalPlanPrice.textContent = plan.price;

    // Show payment method selection, hide invoice form
    paymentMethodsSelect.style.display = '';
    invoiceForm.style.display = 'none';
    clearErrors();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedPlanId = null;
    isSubmitting = false;
    resetButtons();
  }

  function showInvoiceForm() {
    paymentMethodsSelect.style.display = 'none';
    invoiceForm.style.display = '';
    formCompany.value = '';
    formName.value = '';
    formEmail.value = '';
    formPhone.value = '';
    clearErrors();
  }

  function showPaymentMethods() {
    invoiceForm.style.display = 'none';
    paymentMethodsSelect.style.display = '';
    clearErrors();
  }

  // ---- Form Validation (invoice only) ----

  function clearErrors() {
    var errors = document.querySelectorAll('.form-error');
    for (var i = 0; i < errors.length; i++) {
      errors[i].classList.remove('visible');
    }
    var inputs = document.querySelectorAll('.form-group input');
    for (var j = 0; j < inputs.length; j++) {
      inputs[j].classList.remove('error');
    }
  }

  function showError(inputId, message) {
    var input = document.getElementById(inputId);
    var errorEl = input.parentElement.querySelector('.form-error');
    input.classList.add('error');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }

  function validateInvoiceForm() {
    clearErrors();
    var valid = true;

    if (!formCompany.value.trim()) {
      showError('form-company', '会社名を入力してください');
      valid = false;
    }
    if (!formName.value.trim()) {
      showError('form-name', '担当者名を入力してください');
      valid = false;
    }
    if (!formEmail.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail.value)) {
      showError('form-email', '有効なメールアドレスを入力してください');
      valid = false;
    }
    if (!formPhone.value.trim() || !/^[\d\-+() ]{8,20}$/.test(formPhone.value)) {
      showError('form-phone', '有効な電話番号を入力してください');
      valid = false;
    }

    return valid;
  }

  // ---- Button States ----

  function setLoading(button, loading) {
    if (loading) {
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = '<span class="spinner"></span> 処理中...';
    } else {
      button.disabled = false;
      if (button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
      }
    }
  }

  function resetButtons() {
    setLoading(btnCredit, false);
    setLoading(btnInvoice, false);
  }

  // ---- API Calls ----

  function handleCheckout() {
    if (isSubmitting) return;

    isSubmitting = true;
    setLoading(btnCredit, true);
    btnInvoiceSelect.disabled = true;

    fetch(API_BASE + '/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId: selectedPlanId })
    })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.url) {
          window.location.href = result.url;
        } else {
          showToast(result.error || '決済セッションの作成に失敗しました', 'error');
          isSubmitting = false;
          resetButtons();
          btnInvoiceSelect.disabled = false;
        }
      })
      .catch(function () {
        showToast('通信エラーが発生しました。しばらく経ってからお試しください。', 'error');
        isSubmitting = false;
        resetButtons();
        btnInvoiceSelect.disabled = false;
      });
  }

  function handleInvoice() {
    if (isSubmitting) return;
    if (!validateInvoiceForm()) return;

    isSubmitting = true;
    setLoading(btnInvoice, true);

    var data = {
      planId: selectedPlanId,
      companyName: formCompany.value.trim(),
      contactName: formName.value.trim(),
      email: formEmail.value.trim(),
      phone: formPhone.value.trim()
    };

    fetch(API_BASE + '/api/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.message) {
          closeModal();
          showToast(result.message, 'success');
        } else {
          showToast(result.error || '請求書の作成に失敗しました', 'error');
          isSubmitting = false;
          resetButtons();
        }
      })
      .catch(function () {
        showToast('通信エラーが発生しました。しばらく経ってからお試しください。', 'error');
        isSubmitting = false;
        resetButtons();
      });
  }

  // ---- Toast ----

  function showToast(message, type) {
    // Remove existing toast
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'success');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 5000);
  }

  // ---- Event Listeners ----

  // Plan card buttons
  var planButtons = document.querySelectorAll('[data-plan]');
  for (var i = 0; i < planButtons.length; i++) {
    planButtons[i].addEventListener('click', function () {
      openModal(this.getAttribute('data-plan'));
    });
  }

  // Modal close
  var closeBtn = document.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Credit card → direct to Stripe
  if (btnCredit) {
    btnCredit.addEventListener('click', handleCheckout);
  }

  // Invoice select → show form
  if (btnInvoiceSelect) {
    btnInvoiceSelect.addEventListener('click', showInvoiceForm);
  }

  // Invoice submit
  if (btnInvoice) {
    btnInvoice.addEventListener('click', handleInvoice);
  }

  // Back button
  if (btnBack) {
    btnBack.addEventListener('click', showPaymentMethods);
  }

})();
