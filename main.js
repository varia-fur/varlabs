// Age-gate and small site helpers for varlabs
// This file intentionally minimal — only runs the age-gate on AD.html


(function () {
	function showAgeGate() {
		try {
			var storageKey = 'varlabs_ad_allowed';
			if (localStorage.getItem(storageKey) === '1') return; // already allowed

			var overlay = document.createElement('div');
			overlay.id = 'varlabs-age-overlay';
			overlay.innerHTML = '\n      <div class="varlabs-age-modal">\n        <h2>After Dark</h2>\n        <p>This page contains mature content. Are you 18 or older and wish to proceed?</p>\n        <div class="varlabs-age-actions">\n          <button id="varlabs-enter">Enter</button>\n          <button id="varlabs-leave">Leave</button>\n        </div>\n        <small class="varlabs-age-note">Your choice is stored locally on this device.</small>\n      </div>';

			document.documentElement.appendChild(overlay);

			// wire buttons
			document.getElementById('varlabs-enter').addEventListener('click', function () {
				try { localStorage.setItem(storageKey, '1'); } catch (e) { /* ignore */ }
				document.getElementById('varlabs-age-overlay').remove();
			});

			document.getElementById('varlabs-leave').addEventListener('click', function () {
				window.location.href = '/index.html';
			});
		} catch (err) {
			alert('Unable to show age gate overlay. Please use a modern browser.');
			console.error('varlabs age gate error', err);
		}
	}

	try {
		var path = window.location.pathname || window.location.href;
		// Use startsWith to allow wildcard matching like /AD, /AD/, /AD.html, /AD/anything
		if (!path.startsWith('/AD')) return;

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', showAgeGate);
		} else {
			showAgeGate();
		}
	} catch (err) {
		alert('Unable to show age gate overlay. Please use a modern browser.');
		console.error('varlabs age gate error', err);
	}
})();

// Minimal password gate for Local-services.html
(function () {
	try {
		var path = window.location.pathname || window.location.href;
		// Allow any path that begins with /Local-services (covers /Local-services, /Local-services/, /Local-services.html, /Local-services/anything)
		if (!path.startsWith('/Local-services')) return;

		var storageKey = 'varlabs_local_allowed';
		if (localStorage.getItem(storageKey) === '1') return; // already allowed

		// configure the secret here (change as you like)
		var secret = 'opensesame';

		var overlay = document.createElement('div');
		overlay.id = 'varlabs-age-overlay';
		overlay.innerHTML = '\n      <div class="varlabs-age-modal">\n        <h2>Local Services</h2>\n        <p>This area is restricted. Enter the access password to continue.</p>\n        <input id="varlabs-pass" type="password" placeholder="Access password" aria-label="password" />\n        <div id="varlabs-pass-err" style="color:#900;margin-top:8px;display:none;font-size:0.95rem;"></div>\n        <div class="varlabs-age-actions">\n          <button id="varlabs-pass-submit">Submit</button>\n          <button id="varlabs-pass-leave">Leave</button>\n        </div>\n        <small class="varlabs-age-note">Your choice is stored locally on this device.</small>\n      </div>';

		document.documentElement.appendChild(overlay);

		var passInput = document.getElementById('varlabs-pass');
		var errBox = document.getElementById('varlabs-pass-err');

		function showError(msg) {
			errBox.textContent = msg;
			errBox.style.display = 'block';
		}

		document.getElementById('varlabs-pass-submit').addEventListener('click', function () {
			var val = passInput.value || '';
			if (val === secret) {
				try { localStorage.setItem(storageKey, '1'); } catch (e) { /* ignore */ }
				document.getElementById('varlabs-age-overlay').remove();
			} else {
				showError('Incorrect password.');
				passInput.value = '';
				passInput.focus();
			}
		});

		document.getElementById('varlabs-pass-leave').addEventListener('click', function () {
			window.location.href = '/index.html';
		});

		// submit on Enter
		passInput.addEventListener('keydown', function (ev) {
			if (ev.key === 'Enter') document.getElementById('varlabs-pass-submit').click();
		});
	} catch (err) {
		console.error('varlabs local gate error', err);
	}
})();

// Adjust body margin to match nav height so content isn't hidden
(function () {
	function adjustBodyMargin() {
		try {
			var nav = document.querySelector('nav');
			if (!nav) return;
			var rect = nav.getBoundingClientRect();
			// Add a small extra gap (8px) to avoid overlap
			var gap = 8;
			document.body.style.marginTop = (rect.height + gap) + 'px';
		} catch (e) {
			// ignore
		}
	}

	// Run on DOM ready and when resizing
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', adjustBodyMargin);
	} else {
		adjustBodyMargin();
	}
	window.addEventListener('load', adjustBodyMargin);
	window.addEventListener('resize', adjustBodyMargin);
	// Also watch for mutations that might change nav size (e.g., responsive wrapping)
	var navEl = document.querySelector('nav');
	if (navEl && window.MutationObserver) {
		var mo = new MutationObserver(function () { adjustBodyMargin(); });
		mo.observe(navEl, { childList: true, subtree: true, attributes: true });
	}
})();

// Reset localStorage when the reset button is clicked (inline, minimal)
(function () {
	try {
		document.addEventListener('click', function (ev) {
			var t = ev.target;
			if (!t) return;
			if (t.id === 'varlabs-reset-local') {
				try { localStorage.clear(); } catch (e) { }
			}
		});
	} catch (e) { /* ignore */ }
})();
