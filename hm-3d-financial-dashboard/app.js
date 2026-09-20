// Sumruddha Sala E-Portal - 3D Financial Tracking Engine (app.js)

document.addEventListener("DOMContentLoaded", () => {
    // --- Application State ---
    let state = {
        lang: 'mr',
        theme: 'dark',
        expenditures: [...initialFinancialData.expenditures],
        fundingSources: [...initialFinancialData.fundingSources],
        categories: [...initialFinancialData.categories],
        ceoInsights: [...initialFinancialData.ceoInsights],
        editingId: null,
        selectedPhotoUrl: null,
        charts: {
            lineChart: null,
            barChart: null,
            donutChart: null
        }
    };

    // --- DOM Cache Helper ---
    const getEl = id => document.getElementById(id);
    const setSafeText = (id, text) => {
        const el = getEl(id);
        if (el) el.textContent = text;
    };

    // DOM Elements Cache
    const elements = {
        langToggleBtn: getEl('lang-toggle-btn'),
        currentLangText: getEl('current-lang-text'),
        themeToggleBtn: getEl('theme-toggle-btn'),
        themeIcon: getEl('theme-icon'),
        
        kpiSanctionedVal: getEl('kpi-sanctioned-val'),
        kpiUtilizedVal: getEl('kpi-utilized-val'),
        kpiUtilizedPercent: getEl('kpi-utilized-percent'),
        kpiProgressFill: getEl('kpi-progress-fill'),
        kpiRemainingVal: getEl('kpi-remaining-val'),
        kpiRemainingPercent: getEl('kpi-remaining-percent'),
        kpiBurnrateVal: getEl('kpi-burnrate-val'),
        txtRunwayText: getEl('txt-runway-text'),

        fundingSourcesContainer: getEl('funding-sources-container'),
        ceoInsightsContainer: getEl('ceo-insights-container'),
        tableBody: getEl('expenditure-table-body'),

        searchInput: getEl('search-input'),
        filterStartDate: getEl('filter-start-date'),
        filterEndDate: getEl('filter-end-date'),
        filterCategory: getEl('filter-category'),
        filterStatus: getEl('filter-status'),

        openAddModalBtn: getEl('open-add-expense-modal'),
        expenseModal: getEl('expense-modal'),
        closeModalBtn: getEl('close-modal-btn'),
        cancelModalBtn: getEl('cancel-modal-btn'),
        expenseForm: getEl('expense-form'),
        modalTitle: getEl('txt-modal-add-title'),
        dropzoneArea: getEl('dropzone-area'),
        fileInput: getEl('file-input'),
        photoPreviewContainer: getEl('photo-preview-container'),
        photoPreview: getEl('photo-preview'),

        receiptModal: getEl('receipt-modal'),
        closeReceiptBtn: getEl('close-receipt-btn'),
        receiptModalBody: getEl('receipt-modal-body'),

        btnExportCsv: getEl('btn-export-csv'),
        toastContainer: getEl('toast-container'),

        entryId: getEl('entry-id'),
        entryDate: getEl('entry-date'),
        entryVoucher: getEl('entry-voucher'),
        entryCategory: getEl('entry-category'),
        entryFund: getEl('entry-fund'),
        entryStage: getEl('entry-stage'),
        entryAmount: getEl('entry-amount'),
        entryVendor: getEl('entry-vendor'),
        entryDesc: getEl('entry-desc'),
        entryStatus: getEl('entry-status'),
        entryGeotag: getEl('entry-geotag')
    };

    const i18n = {
        mr: {
            langButton: "English",
            pageTitle: "३.५ निधी उपयोगिता आणि वित्तीय ट्रॅकिंग प्रणाली",
            pageDesc: "FR 5.1 निधी उपयोगिता नियंत्रण • FR 5.2 तारीखवार खर्च नोंदणी • FR 5.3 खर्च ट्रेंड विश्लेषण",
            btnAddExpense: "+ नवीन खर्च नोंदवा",
            btnExport: "अहवाल डाउनलोड",
            btnPrint: "प्रिंट",
            lblSanctioned: "मंजूर एकूण निधी (Sanctioned)",
            lblUtilized: "खर्च केलेली एकूण रक्कम (Utilized)",
            lblRemaining: "उर्वरित शिल्लक निधी (Balance)",
            lblBurnrate: "सरासरी दैनिक खर्च गती (Burn Rate)",
            secFunding: "FR २.३ निधी स्रोत वितरण विवरण (Funding Distribution)",
            secCeo: "मुख्य कार्यकारी अधिकारी (CEO) धोरणात्मक शिफारसी व मार्गदर्शन",
            secCharts: "FR ५.३ खर्च ट्रेंड आणि आलेख विश्लेषण (Utilization Trends & Analytics)",
            secExpenditures: "FR ५.२ तारीखवार खर्च नोंदी (Date-wise Expenditure Records)",
            searchPlaceholder: "पावती क्र., काम किंवा कंत्राटदार शोधा...",
            saveSuccess: "खर्च नोंदणी यशस्वीपणे जतन केली!",
            deleteSuccess: "खर्च नोंदणी हटवण्यात आली."
        },
        en: {
            langButton: "मराठी",
            pageTitle: "3.5 Financial Tracking & Utilization Module",
            pageDesc: "FR 5.1 Fund Utilization • FR 5.2 Date-wise Entries • FR 5.3 Utilization Trends",
            btnAddExpense: "+ Add New Expense",
            btnExport: "Export Report",
            btnPrint: "Print",
            lblSanctioned: "Sanctioned Amount",
            lblUtilized: "Utilized Amount",
            lblRemaining: "Remaining Balance",
            lblBurnrate: "Daily Burn Rate",
            secFunding: "FR 2.3 Funding Source Distribution Breakdown",
            secCeo: "Chief Executive Officer (CEO) Strategic Directives & Advisory",
            secCharts: "FR 5.3 Utilization Trend & Visual Analytics",
            secExpenditures: "FR 5.2 Date-wise Financial Expenditure Log",
            searchPlaceholder: "Search voucher, work or contractor...",
            saveSuccess: "Expense entry saved successfully!",
            deleteSuccess: "Expense entry deleted."
        }
    };

    function init() {
        setupEventListeners();
        setup3DTiltPhysics();
        recalculateAndRender();
    }

    // --- Interactive 3D Card Tilt Physics ---
    function setup3DTiltPhysics() {
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // --- Recalculate & Render Core ---
    function recalculateAndRender() {
        const totalSanctioned = initialFinancialData.fundOverview.totalSanctioned;
        const totalUtilized = state.expenditures.reduce((sum, item) => sum + item.amount, 0);
        const remaining = totalSanctioned - totalUtilized;
        const utilizedPercentage = ((totalUtilized / totalSanctioned) * 100).toFixed(1);
        const remainingPercentage = (100 - utilizedPercentage).toFixed(1);

        state.fundingSources.forEach(source => {
            source.utilized = state.expenditures
                .filter(item => item.fundSource === source.id)
                .reduce((sum, item) => sum + item.amount, 0);
        });

        const dailyBurnRate = Math.round(totalUtilized / 110);
        const runwayDays = Math.round(remaining / dailyBurnRate);

        if (elements.kpiSanctionedVal) elements.kpiSanctionedVal.textContent = formatCurrency(totalSanctioned);
        if (elements.kpiUtilizedVal) elements.kpiUtilizedVal.textContent = formatCurrency(totalUtilized);
        if (elements.kpiUtilizedPercent) elements.kpiUtilizedPercent.textContent = `${utilizedPercentage}% ${state.lang === 'mr' ? 'निधी वापर पूर्ण' : 'spent'}`;
        if (elements.kpiProgressFill) elements.kpiProgressFill.style.width = `${utilizedPercentage}%`;

        if (elements.kpiRemainingVal) elements.kpiRemainingVal.textContent = formatCurrency(remaining);
        if (elements.kpiRemainingPercent) elements.kpiRemainingPercent.textContent = `${remainingPercentage}% ${state.lang === 'mr' ? 'उपलब्ध निधी' : 'available'}`;

        if (elements.kpiBurnrateVal) elements.kpiBurnrateVal.textContent = `${formatCurrency(dailyBurnRate)} / ${state.lang === 'mr' ? 'दिवस' : 'day'}`;
        if (elements.txtRunwayText) elements.txtRunwayText.textContent = state.lang === 'mr' ? `अंदाजित ${runwayDays} दिवस निधी पुरेल` : `Estimated ${runwayDays} days runway`;

        renderFundingSources();
        renderCeoInsights();
        filterAndRenderTable();
        renderCharts(totalSanctioned, totalUtilized);
        setup3DTiltPhysics();
    }

    function renderFundingSources() {
        if (!elements.fundingSourcesContainer) return;
        elements.fundingSourcesContainer.innerHTML = '';
        state.fundingSources.forEach(source => {
            const percent = ((source.utilized / source.sanctioned) * 100).toFixed(1);
            const name = state.lang === 'mr' ? source.nameMr : source.nameEn;

            const cardHtml = `
                <div class="scheme-card glass-card">
                    <div class="scheme-header">
                        <div class="scheme-icon" style="background: ${source.color}; box-shadow: 0 4px 12px ${source.glow};">
                            <i class="fa-solid ${source.icon}"></i>
                        </div>
                        <div class="scheme-name">${name}</div>
                    </div>
                    <div class="scheme-stats">
                        <span>${state.lang === 'mr' ? 'खर्च' : 'Spent'}: ${formatCurrency(source.utilized)}</span>
                        <span>${percent}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${percent}%; background: ${source.color};"></div>
                    </div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px; text-align: right;">
                        ${state.lang === 'mr' ? 'मंजूर' : 'Sanctioned'}: ${formatCurrency(source.sanctioned)}
                    </div>
                </div>
            `;
            elements.fundingSourcesContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    function renderCeoInsights() {
        if (!elements.ceoInsightsContainer) return;
        elements.ceoInsightsContainer.innerHTML = '';
        state.ceoInsights.forEach(insight => {
            const title = state.lang === 'mr' ? insight.titleMr : insight.titleEn;
            const message = state.lang === 'mr' ? insight.messageMr : insight.messageEn;
            const action = state.lang === 'mr' ? insight.actionMr : insight.actionEn;

            let statusClass = "status-info";
            if (insight.type === "success") statusClass = "status-success";
            if (insight.type === "warning") statusClass = "status-warning";

            const cardHtml = `
                <div class="ceo-insight-card glass-card">
                    <div class="ceo-card-header">
                        <div class="ceo-card-title">
                            <i class="fa-solid ${insight.icon}" style="color: #f59e0b;"></i>
                            <span>${title}</span>
                        </div>
                        <span class="ceo-card-status ${statusClass}">${insight.status}</span>
                    </div>
                    <div class="ceo-card-body">${message}</div>
                    <div class="ceo-card-action">
                        <i class="fa-solid fa-lightbulb" style="color: #f59e0b; margin-right: 6px;"></i>
                        <strong>${state.lang === 'mr' ? 'CEO शिफारस:' : 'CEO Recommendation:'}</strong> ${action}
                    </div>
                </div>
            `;
            elements.ceoInsightsContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    function filterAndRenderTable() {
        if (!elements.tableBody) return;
        const searchTerm = (elements.searchInput ? elements.searchInput.value : '').toLowerCase();
        const startDate = elements.filterStartDate ? elements.filterStartDate.value : '';
        const endDate = elements.filterEndDate ? elements.filterEndDate.value : '';
        const categoryFilter = elements.filterCategory ? elements.filterCategory.value : 'all';
        const statusFilter = elements.filterStatus ? elements.filterStatus.value : 'all';

        const filtered = state.expenditures.filter(item => {
            const matchesSearch = 
                item.voucherNo.toLowerCase().includes(searchTerm) ||
                (item.descriptionMr && item.descriptionMr.toLowerCase().includes(searchTerm)) ||
                (item.descriptionEn && item.descriptionEn.toLowerCase().includes(searchTerm)) ||
                (item.vendorMr && item.vendorMr.toLowerCase().includes(searchTerm)) ||
                (item.vendorEn && item.vendorEn.toLowerCase().includes(searchTerm));

            const itemDate = new Date(item.date);
            const matchesStart = !startDate || itemDate >= new Date(startDate);
            const matchesEnd = !endDate || itemDate <= new Date(endDate);
            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

            return matchesSearch && matchesStart && matchesEnd && matchesCategory && matchesStatus;
        });

        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        elements.tableBody.innerHTML = '';

        if (filtered.length === 0) {
            elements.tableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                        <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                        ${state.lang === 'mr' ? 'कोणत्याही खर्चाच्या नोंदी आढळल्या नाहीत.' : 'No expenditure records found.'}
                    </td>
                </tr>
            `;
            return;
        }

        filtered.forEach(item => {
            const catName = state.lang === 'mr' ? item.categoryNameMr : item.categoryNameEn;
            const fundName = state.lang === 'mr' ? item.fundSourceNameMr : item.fundSourceNameEn;
            const desc = state.lang === 'mr' ? item.descriptionMr : item.descriptionEn;
            const vendor = state.lang === 'mr' ? item.vendorMr : item.vendorEn;
            const stage = state.lang === 'mr' ? item.stageMr : item.stage;

            let statusClass = "status-completed";
            let statusText = state.lang === 'mr' ? 'पूर्ण' : 'Completed';
            if (item.status === "Pending") {
                statusClass = "status-pending";
                statusText = state.lang === 'mr' ? 'प्रलंबित' : 'Pending';
            } else if (item.status === "Blocked") {
                statusClass = "status-blocked";
                statusText = state.lang === 'mr' ? 'अडकलेले' : 'Blocked';
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600; white-space: nowrap;">
                    <i class="fa-regular fa-calendar-days" style="color: #3b82f6; margin-right: 4px;"></i>
                    ${item.date}
                </td>
                <td style="font-family: monospace; font-weight: 700; color: #60a5fa;">${item.voucherNo}</td>
                <td>
                    <div style="font-weight: 700;">${desc}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">
                        <span class="badge-pill" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">${catName}</span>
                        <span style="margin-left: 4px;">• ${stage}</span>
                    </div>
                </td>
                <td style="font-size: 0.82rem; font-weight: 600;">${fundName}</td>
                <td style="font-size: 0.85rem;">${vendor}</td>
                <td style="font-weight: 800; color: #10b981; font-size: 0.95rem;">${formatCurrency(item.amount)}</td>
                <td>
                    ${item.geoTagged 
                        ? `<span class="geotag-pill geotag-verified"><i class="fa-solid fa-location-dot"></i> Verified</span>` 
                        : `<span class="geotag-pill geotag-missing"><i class="fa-solid fa-circle-exclamation"></i> Pending</span>`}
                </td>
                <td>
                    <span class="status-pill ${statusClass}">
                        <span class="status-dot"></span>
                        ${statusText}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn view-receipt-btn" data-id="${item.id}" title="पावती पहा">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${item.id}" title="संपादन करा">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${item.id}" title="हटवा">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            elements.tableBody.appendChild(tr);
        });

        attachTableActionListeners();
    }

    function attachTableActionListeners() {
        document.querySelectorAll('.view-receipt-btn').forEach(btn => {
            btn.addEventListener('click', (e) => openReceiptModal(e.currentTarget.getAttribute('data-id')));
        });
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => openEditModal(e.currentTarget.getAttribute('data-id')));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => deleteExpense(e.currentTarget.getAttribute('data-id')));
        });
    }

    function renderCharts(sanctionedTotal, utilizedTotal) {
        const lineCanvas = getEl('trendLineChart');
        const barCanvas = getEl('categoryBarChart');
        const donutCanvas = getEl('schemeDonutChart');

        if (!lineCanvas || !barCanvas || !donutCanvas || typeof Chart === 'undefined') return;

        const isDark = state.theme === 'dark';
        const textColor = isDark ? '#94a3b8' : '#475569';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

        if (state.charts.lineChart) state.charts.lineChart.destroy();
        if (state.charts.barChart) state.charts.barChart.destroy();
        if (state.charts.donutChart) state.charts.donutChart.destroy();

        const ctxLine = lineCanvas.getContext('2d');
        const months = initialFinancialData.monthlyTrends.map(m => state.lang === 'mr' ? m.month : m.monthEn);
        const actualSpentData = initialFinancialData.monthlyTrends.map(m => m.actualSpent);

        state.charts.lineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: state.lang === 'mr' ? 'प्रत्यक्ष प्रगतीशील खर्च (₹)' : 'Cumulative Expenditure (₹)',
                        data: actualSpentData,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.18)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 6,
                        pointBackgroundColor: '#3b82f6'
                    },
                    {
                        label: state.lang === 'mr' ? 'मंजूर बजेट मर्यादा (Ceiling)' : 'Sanctioned Ceiling Limit',
                        data: [2500000, 2500000, 2500000, 2500000],
                        borderColor: '#ef4444',
                        borderDash: [6, 6],
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: textColor } } },
                scales: {
                    x: { ticks: { color: textColor }, grid: { color: gridColor } },
                    y: { ticks: { color: textColor, callback: value => '₹ ' + (value/100000).toFixed(1) + ' L' }, grid: { color: gridColor } }
                }
            }
        });

        const ctxBar = barCanvas.getContext('2d');
        const catLabels = state.categories.map(c => state.lang === 'mr' ? c.nameMr : c.nameEn);
        const catSpent = state.categories.map(c => state.expenditures.filter(item => item.category === c.id).reduce((sum, item) => sum + item.amount, 0));
        const catSanctioned = state.categories.map(c => c.sanctioned);

        state.charts.barChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: catLabels,
                datasets: [
                    { label: state.lang === 'mr' ? 'प्रत्यक्ष खर्च (₹)' : 'Spent Amount (₹)', data: catSpent, backgroundColor: '#10b981', borderRadius: 6 },
                    { label: state.lang === 'mr' ? 'मंजूर बजेट (₹)' : 'Sanctioned Budget (₹)', data: catSanctioned, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', borderRadius: 6 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: textColor } } },
                scales: {
                    x: { ticks: { color: textColor }, grid: { display: false } },
                    y: { ticks: { color: textColor, callback: value => '₹ ' + (value/100000).toFixed(1) + ' L' }, grid: { color: gridColor } }
                }
            }
        });

        const ctxDonut = donutCanvas.getContext('2d');
        const schemeLabels = state.fundingSources.map(s => state.lang === 'mr' ? s.nameMr : s.nameEn);
        const schemeSpent = state.fundingSources.map(s => s.utilized);
        const schemeColors = state.fundingSources.map(s => s.color);

        state.charts.donutChart = new Chart(ctxDonut, {
            type: 'doughnut',
            data: {
                labels: schemeLabels,
                datasets: [{ data: schemeSpent, backgroundColor: schemeColors, borderWidth: 0 }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { color: textColor } } },
                cutout: '70%'
            }
        });
    }

    function setupEventListeners() {
        if (elements.langToggleBtn) elements.langToggleBtn.addEventListener('click', toggleLanguage);
        if (elements.themeToggleBtn) elements.themeToggleBtn.addEventListener('click', toggleTheme);

        if (elements.searchInput) elements.searchInput.addEventListener('input', filterAndRenderTable);
        if (elements.filterStartDate) elements.filterStartDate.addEventListener('change', filterAndRenderTable);
        if (elements.filterEndDate) elements.filterEndDate.addEventListener('change', filterAndRenderTable);
        if (elements.filterCategory) elements.filterCategory.addEventListener('change', filterAndRenderTable);
        if (elements.filterStatus) elements.filterStatus.addEventListener('change', filterAndRenderTable);

        if (elements.openAddModalBtn) elements.openAddModalBtn.addEventListener('click', () => openAddModal());
        if (elements.closeModalBtn) elements.closeModalBtn.addEventListener('click', closeModal);
        if (elements.cancelModalBtn) elements.cancelModalBtn.addEventListener('click', closeModal);
        if (elements.closeReceiptBtn) elements.closeReceiptBtn.addEventListener('click', closeReceiptModal);

        if (elements.dropzoneArea && elements.fileInput) {
            elements.dropzoneArea.addEventListener('click', () => elements.fileInput.click());
            elements.fileInput.addEventListener('change', handlePhotoUpload);
        }

        if (elements.expenseForm) elements.expenseForm.addEventListener('submit', handleFormSubmit);
        if (elements.btnExportCsv) elements.btnExportCsv.addEventListener('click', exportToCSV);
    }

    function openAddModal() {
        state.editingId = null;
        state.selectedPhotoUrl = null;
        if (elements.expenseForm) elements.expenseForm.reset();
        if (elements.entryDate) elements.entryDate.value = new Date().toISOString().split('T')[0];
        if (elements.modalTitle) elements.modalTitle.textContent = state.lang === 'mr' ? 'नवीन खर्च नोंदणी करा (Add Expenditure)' : 'Add New Expenditure Entry';
        if (elements.photoPreviewContainer) elements.photoPreviewContainer.style.display = 'none';
        if (elements.expenseModal) elements.expenseModal.classList.add('active');
    }

    function openEditModal(id) {
        const item = state.expenditures.find(x => x.id === id);
        if (!item) return;

        state.editingId = id;
        state.selectedPhotoUrl = item.photoUrl || null;

        if (elements.entryId) elements.entryId.value = item.id;
        if (elements.entryDate) elements.entryDate.value = item.date;
        if (elements.entryVoucher) elements.entryVoucher.value = item.voucherNo;
        if (elements.entryCategory) elements.entryCategory.value = item.category;
        if (elements.entryFund) elements.entryFund.value = item.fundSource;
        if (elements.entryStage) elements.entryStage.value = item.stage;
        if (elements.entryAmount) elements.entryAmount.value = item.amount;
        if (elements.entryVendor) elements.entryVendor.value = item.vendorMr || item.vendorEn;
        if (elements.entryDesc) elements.entryDesc.value = item.descriptionMr || item.descriptionEn;
        if (elements.entryStatus) elements.entryStatus.value = item.status;
        if (elements.entryGeotag) elements.entryGeotag.checked = item.geoTagged;

        if (item.photoUrl && elements.photoPreview) {
            elements.photoPreview.src = item.photoUrl;
            if (elements.photoPreviewContainer) elements.photoPreviewContainer.style.display = 'block';
        } else if (elements.photoPreviewContainer) {
            elements.photoPreviewContainer.style.display = 'none';
        }

        if (elements.modalTitle) elements.modalTitle.textContent = state.lang === 'mr' ? 'खर्च नोंदणी संपादन करा (Edit Expenditure)' : 'Edit Expenditure Entry';
        if (elements.expenseModal) elements.expenseModal.classList.add('active');
    }

    function closeModal() {
        if (elements.expenseModal) elements.expenseModal.classList.remove('active');
    }

    function openReceiptModal(id) {
        const item = state.expenditures.find(x => x.id === id);
        if (!item || !elements.receiptModalBody) return;

        const catName = state.lang === 'mr' ? item.categoryNameMr : item.categoryNameEn;
        const fundName = state.lang === 'mr' ? item.fundSourceNameMr : item.fundSourceNameEn;
        const desc = state.lang === 'mr' ? item.descriptionMr : item.descriptionEn;
        const vendor = state.lang === 'mr' ? item.vendorMr : item.vendorEn;

        elements.receiptModalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.25rem;">
                <div style="font-size: 0.8rem; color: var(--text-muted);">समृद्ध शाळा ई-पोर्टल डिजिटल पावती प्रमाणक</div>
                <h4 style="font-weight: 800; font-size: 1.2rem; color: #60a5fa; margin-top: 4px;">${item.voucherNo}</h4>
            </div>

            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 10px; font-size: 0.85rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 1rem;">
                <div><strong>तारीख:</strong> ${item.date}</div>
                <div><strong>रक्कम:</strong> <span style="color: #10b981; font-weight: 800;">${formatCurrency(item.amount)}</span></div>
                <div><strong>कामाचा प्रकार:</strong> ${catName}</div>
                <div><strong>निधी स्रोत:</strong> ${fundName}</div>
                <div style="grid-column: 1/-1;"><strong>कंत्राटदार:</strong> ${vendor}</div>
                <div style="grid-column: 1/-1;"><strong>कामाचे वर्णन:</strong> ${desc}</div>
                <div style="grid-column: 1/-1;"><strong>टप्पा (Stage):</strong> ${item.stage}</div>
            </div>

            ${item.photoUrl ? `
                <div style="margin-top: 1rem; text-align: center;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">प्रत्यक्ष कामाचा अपलोड केलेला फोटो:</div>
                    <img src="${item.photoUrl}" alt="Voucher Photo" style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 12px; border: 1px solid var(--border-glass);">
                </div>
            ` : ''}

            <div style="margin-top: 1rem; padding: 0.6rem; background: rgba(6, 182, 212, 0.1); border-radius: 8px; font-size: 0.75rem; color: #06b6d4; display: flex; align-items: center; justify-content: space-between;">
                <span><i class="fa-solid fa-location-crosshairs"></i> GPS: 18.7504° N, 73.8761° E</span>
                <span><i class="fa-solid fa-shield-check"></i> डिजिटल सहीने पडताळलेले</span>
            </div>
        `;
        if (elements.receiptModal) elements.receiptModal.classList.add('active');
    }

    function closeReceiptModal() {
        if (elements.receiptModal) elements.receiptModal.classList.remove('active');
    }

    function handlePhotoUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                state.selectedPhotoUrl = event.target.result;
                if (elements.photoPreview) elements.photoPreview.src = state.selectedPhotoUrl;
                if (elements.photoPreviewContainer) elements.photoPreviewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const date = elements.entryDate ? elements.entryDate.value : '';
        const voucherNo = elements.entryVoucher ? elements.entryVoucher.value : '';
        const category = elements.entryCategory ? elements.entryCategory.value : '';
        const fundSource = elements.entryFund ? elements.entryFund.value : '';
        const stage = elements.entryStage ? elements.entryStage.value : '';
        const amount = elements.entryAmount ? parseFloat(elements.entryAmount.value) : 0;
        const vendor = elements.entryVendor ? elements.entryVendor.value : '';
        const desc = elements.entryDesc ? elements.entryDesc.value : '';
        const status = elements.entryStatus ? elements.entryStatus.value : 'Completed';
        const geoTagged = elements.entryGeotag ? elements.entryGeotag.checked : true;

        const catObj = state.categories.find(c => c.id === category);
        const fundObj = state.fundingSources.find(f => f.id === fundSource);

        if (state.editingId) {
            const index = state.expenditures.findIndex(x => x.id === state.editingId);
            if (index !== -1) {
                state.expenditures[index] = {
                    ...state.expenditures[index],
                    date,
                    voucherNo,
                    category,
                    categoryNameMr: catObj ? catObj.nameMr : category,
                    categoryNameEn: catObj ? catObj.nameEn : category,
                    fundSource,
                    fundSourceNameMr: fundObj ? fundObj.nameMr : fundSource,
                    fundSourceNameEn: fundObj ? fundObj.nameEn : fundSource,
                    stage,
                    amount,
                    vendorMr: vendor,
                    vendorEn: vendor,
                    descriptionMr: desc,
                    descriptionEn: desc,
                    status,
                    geoTagged,
                    photoUrl: state.selectedPhotoUrl || state.expenditures[index].photoUrl
                };
            }
        } else {
            const newEntry = {
                id: `EXP-2026-${String(state.expenditures.length + 1).padStart(3, '0')}`,
                date,
                voucherNo,
                category,
                categoryNameMr: catObj ? catObj.nameMr : category,
                categoryNameEn: catObj ? catObj.nameEn : category,
                fundSource,
                fundSourceNameMr: fundObj ? fundObj.nameMr : fundSource,
                fundSourceNameEn: fundObj ? fundObj.nameEn : fundSource,
                stage,
                stageMr: stage,
                amount,
                vendorMr: vendor,
                vendorEn: vendor,
                descriptionMr: desc,
                descriptionEn: desc,
                status,
                statusCode: status.toLowerCase(),
                geoTagged,
                hasPhoto: !!state.selectedPhotoUrl,
                photoUrl: state.selectedPhotoUrl || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80",
                remarksMr: "नवीन नोंद जतन केली.",
                remarksEn: "New entry saved successfully."
            };
            state.expenditures.unshift(newEntry);

            if (typeof confetti === 'function') {
                confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
            }
        }

        closeModal();
        recalculateAndRender();
        showToast(i18n[state.lang].saveSuccess, 'success');
    }

    function deleteExpense(id) {
        if (confirm(state.lang === 'mr' ? 'तुम्हाला ही खर्चाची नोंद खरंच हटवायची आहे का?' : 'Are you sure you want to delete this expenditure record?')) {
            state.expenditures = state.expenditures.filter(x => x.id !== id);
            recalculateAndRender();
            showToast(i18n[state.lang].deleteSuccess, 'danger');
        }
    }

    function exportToCSV() {
        const headers = ["ID", "Date", "Voucher No", "Category", "Funding Source", "Vendor", "Amount (INR)", "Status", "Geo-Tagged"];
        const rows = state.expenditures.map(item => [
            item.id,
            item.date,
            item.voucherNo,
            item.categoryNameEn,
            item.fundSourceNameEn,
            `"${item.vendorEn || item.vendorMr}"`,
            item.amount,
            item.status,
            item.geoTagged ? "Yes" : "No"
        ]);

        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `sumruddha_sala_financial_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function toggleLanguage() {
        state.lang = state.lang === 'mr' ? 'en' : 'mr';
        if (elements.currentLangText) elements.currentLangText.textContent = i18n[state.lang].langButton;

        document.querySelectorAll('[data-mr]').forEach(el => {
            el.textContent = state.lang === 'mr' ? el.getAttribute('data-mr') : el.getAttribute('data-en');
        });

        setSafeText('txt-page-title', i18n[state.lang].pageTitle);
        setSafeText('txt-page-desc', i18n[state.lang].pageDesc);
        setSafeText('txt-btn-add-expense', i18n[state.lang].btnAddExpense);
        setSafeText('txt-btn-export', i18n[state.lang].btnExport);
        setSafeText('txt-btn-print', i18n[state.lang].btnPrint);

        setSafeText('lbl-sanctioned-title', i18n[state.lang].lblSanctioned);
        setSafeText('lbl-utilized-title', i18n[state.lang].lblUtilized);
        setSafeText('lbl-remaining-title', i18n[state.lang].lblRemaining);
        setSafeText('lbl-burnrate-title', i18n[state.lang].lblBurnrate);

        setSafeText('txt-funding-section-title', i18n[state.lang].secFunding);
        setSafeText('txt-ceo-suite-title', i18n[state.lang].secCeo);
        setSafeText('txt-charts-section-title', i18n[state.lang].secCharts);
        setSafeText('txt-expenditures-title', i18n[state.lang].secExpenditures);

        if (elements.searchInput) elements.searchInput.placeholder = i18n[state.lang].searchPlaceholder;

        recalculateAndRender();
    }

    function toggleTheme() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);
        if (elements.themeIcon) elements.themeIcon.className = state.theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        recalculateAndRender();
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    }

    function showToast(message, type = 'info') {
        if (!elements.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}" style="color: ${type === 'success' ? '#10b981' : '#ef4444'};"></i>
            <span style="font-size: 0.88rem; font-weight: 600;">${message}</span>
        `;
        elements.toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
    }

    init();
});
