// Sumruddha Sala E-Portal - 3D Financial Tracking Module Data Model

const initialFinancialData = {
    schoolInfo: {
        nameMr: "जिल्हा परिषद प्राथमिक शाळा, खेड",
        nameEn: "Zilla Parishad Primary School, Khed",
        udiseCode: "27250604102",
        districtMr: "पुणे",
        districtEn: "Pune",
        blockMr: "खेड तालुका",
        blockEn: "Khed Block",
        headMasterMr: "श्री. रमेश शांताराम पाटील",
        headMasterEn: "Shri Ramesh S. Patil",
        role: "Head Master (HM)",
        currentFiscalYear: "2025-2026",
        lastUpdated: "2026-07-21"
    },

    // FR 5.1 - Fund Utilization Overview
    fundOverview: {
        totalSanctioned: 2500000, // ₹ 25.00 Lakhs
        totalUtilized: 1640000,   // ₹ 16.40 Lakhs
        currency: "INR"
    },

    // FR 2.3 - Funding Source Distribution
    fundingSources: [
        {
            id: "fund_annual",
            nameMr: "वार्षिक योजना",
            nameEn: "Annual Plan",
            sanctioned: 1000000,
            utilized: 720000,
            color: "#3B82F6",
            glow: "rgba(59, 130, 246, 0.4)",
            icon: "fa-calendar-check"
        },
        {
            id: "fund_mineral",
            nameMr: "गौण खनिज निधी",
            nameEn: "Minor Mineral Fund",
            sanctioned: 750000,
            utilized: 510000,
            color: "#8B5CF6",
            glow: "rgba(139, 92, 246, 0.4)",
            icon: "fa-gem"
        },
        {
            id: "fund_zp",
            nameMr: "जि. प. स्वतःचा निधी",
            nameEn: "ZP Own Fund",
            sanctioned: 450000,
            utilized: 280000,
            color: "#10B981",
            glow: "rgba(16, 185, 129, 0.4)",
            icon: "fa-building-columns"
        },
        {
            id: "fund_csr",
            nameMr: "सीएसआर निधी",
            nameEn: "CSR Fund",
            sanctioned: 300000,
            utilized: 130000,
            color: "#F59E0B",
            glow: "rgba(245, 158, 11, 0.4)",
            icon: "fa-hand-holding-heart"
        }
    ],

    // FR 2.2 - Physical Progress Analytics Categories
    categories: [
        { id: "classrooms", nameMr: "वर्गखोल्या (Classrooms)", nameEn: "Classrooms", sanctioned: 1000000, icon: "fa-school" },
        { id: "toilets", nameMr: "स्वच्छतागृह (Toilets)", nameEn: "Toilets", sanctioned: 600000, icon: "fa-restroom" },
        { id: "fencing", nameMr: "संरक्षक भिंत (Fencing)", nameEn: "Fencing", sanctioned: 500000, icon: "fa-shield-halved" },
        { id: "water", nameMr: "पिण्याचे पाणी (Water Facilities)", nameEn: "Water Facilities", sanctioned: 400000, icon: "fa-faucet-drip" }
    ],

    // FR 3.3 - Standard Work Stages & Weightage
    workStages: [
        { stageMr: "नियोजन व मंजुरी (Planning & Approval)", stageEn: "Planning & Approval", weightage: 10 },
        { stageMr: "पाडकाम व जागा सिद्धता (Demolition & Site Prep)", stageEn: "Demolition & Site Prep", weightage: 15 },
        { stageMr: "पाया व प्लिंथ काम (Foundation & Plinth)", stageEn: "Foundation & Plinth", weightage: 20 },
        { stageMr: "भिंती व स्ट्रक्चर बांधकाम (Walls & Construction)", stageEn: "Walls & Construction", weightage: 15 },
        { stageMr: "फिनिशिंग व हस्तांतरण (Finishing & Handover)", stageEn: "Finishing & Handover", weightage: 40 }
    ],

    // FR 5.2 - Date-wise Expenditure Entries
    expenditures: [
        {
            id: "EXP-2026-001",
            date: "2026-04-12",
            voucherNo: "VCH/2026/041",
            category: "classrooms",
            categoryNameMr: "वर्गखोल्या",
            categoryNameEn: "Classrooms",
            fundSource: "fund_annual",
            fundSourceNameMr: "वार्षिक योजना",
            fundSourceNameEn: "Annual Plan",
            stage: "Planning & Approval",
            stageMr: "नियोजन व मंजुरी (10%)",
            descriptionMr: "सॉइल टेस्टिंग, आर्किटेक्चरल प्लॅन व स्ट्रक्चरल डिझाइन मंजुरी फी",
            descriptionEn: "Soil testing, Architectural Plan & Structural Design approval fee",
            vendorMr: "सह्याद्री इंजिनिअरिंग कन्सल्टंट्स",
            vendorEn: "Sahyadri Engineering Consultants",
            amount: 100000,
            status: "Completed",
            statusCode: "green",
            geoTagged: true,
            hasPhoto: true,
            photoUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
            remarksMr: "तांत्रिक मंजुरी प्राप्त झाली असून सर्व नकाशे प्रमाणित आहेत.",
            remarksEn: "Technical approval received and drawings verified."
        },
        {
            id: "EXP-2026-002",
            date: "2026-04-28",
            voucherNo: "VCH/2026/089",
            category: "classrooms",
            categoryNameMr: "वर्गखोल्या",
            categoryNameEn: "Classrooms",
            fundSource: "fund_annual",
            fundSourceNameMr: "वार्षिक योजना",
            fundSourceNameEn: "Annual Plan",
            stage: "Demolition & Site Prep",
            stageMr: "पाडकाम व जागा सिद्धता (15%)",
            descriptionMr: "जुन्या धोकादायक इमारतीचे सुरक्षित पाडकाम व ढिगारा हटवणे",
            descriptionEn: "Safe demolition of old dilapidated structure & debris removal",
            vendorMr: "शिवनेरी इन्फ्रा प्रोजेक्ट्स",
            vendorEn: "Shivneri Infra Projects",
            amount: 150000,
            status: "Completed",
            statusCode: "green",
            geoTagged: true,
            hasPhoto: true,
            photoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80",
            remarksMr: "जागा पूर्णपणे मोकळी करून सपाटीकरण पूर्ण झाले.",
            remarksEn: "Site cleared and leveled completely."
        },
        {
            id: "EXP-2026-003",
            date: "2026-05-15",
            voucherNo: "VCH/2026/134",
            category: "toilets",
            categoryNameMr: "स्वच्छतागृह",
            categoryNameEn: "Toilets",
            fundSource: "fund_mineral",
            fundSourceNameMr: "गौण खनिज निधी",
            fundSourceNameEn: "Minor Mineral Fund",
            stage: "Foundation & Plinth",
            stageMr: "पाया व प्लिंथ काम (20%)",
            descriptionMr: "मुले व मुलींसाठी स्वतंत्र स्वच्छतागृह प्लिंथ काँक्रीटीकरण",
            descriptionEn: "RCC foundation & Plinth work for independent boys & girls toilets",
            vendorMr: "साई कन्स्ट्रक्शन कंपनी",
            vendorEn: "Sai Construction Co.",
            amount: 210000,
            status: "Completed",
            statusCode: "green",
            geoTagged: true,
            hasPhoto: true,
            photoUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
            remarksMr: "प्लॅस्टर व प्लिंथ बीमचे काम दर्जेदार झाले आहे.",
            remarksEn: "Plinth beam concrete casting completed with high quality."
        },
        {
            id: "EXP-2026-004",
            date: "2026-05-30",
            voucherNo: "VCH/2026/198",
            category: "water",
            categoryNameMr: "पिण्याचे पाणी",
            categoryNameEn: "Water Facilities",
            fundSource: "fund_csr",
            fundSourceNameMr: "सीएसआर निधी",
            fundSourceNameEn: "CSR Fund",
            stage: "Finishing & Handover",
            stageMr: "फिनिशिंग व हस्तांतरण (40%)",
            descriptionMr: "सोलर संचलित RO वॉटर प्युरीफायर व ५००० लि. टाकी बसवणे",
            descriptionEn: "Installation of Solar-powered RO Water Purifier & 5000L Storage Tank",
            vendorMr: "अक्वाटेक सिस्टीम्स लि.",
            vendorEn: "Aquatech Systems Ltd.",
            amount: 130000,
            status: "Completed",
            statusCode: "green",
            geoTagged: true,
            hasPhoto: true,
            photoUrl: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=600&q=80",
            remarksMr: "पाणी चाचणी अहवाल शुद्ध आणि मानकानुसार प्राप्त.",
            remarksEn: "Water purity testing report certified & operational."
        },
        {
            id: "EXP-2026-005",
            date: "2026-06-14",
            voucherNo: "VCH/2026/245",
            category: "classrooms",
            categoryNameMr: "वर्गखोल्या",
            categoryNameEn: "Classrooms",
            fundSource: "fund_annual",
            fundSourceNameMr: "वार्षिक योजना",
            fundSourceNameEn: "Annual Plan",
            stage: "Foundation & Plinth",
            stageMr: "पाया व प्लिंथ काम (20%)",
            descriptionMr: "नवीन २ अतिरिक्त वर्गखोल्या पाया खुदाई व काँक्रीटीकरण चरण १",
            descriptionEn: "Excavation and foundation concrete work for 2 new classrooms",
            vendorMr: "शिवनेरी इन्फ्रा प्रोजेक्ट्स",
            vendorEn: "Shivneri Infra Projects",
            amount: 320000,
            status: "Completed",
            statusCode: "green",
            geoTagged: true,
            hasPhoto: true,
            photoUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
            remarksMr: "इंजिनिअर तपासणी पूर्ण, प्लिंथ लेवल सर्टिफाय झाले.",
            remarksEn: "Engineer verification completed and plinth level certified."
        },
        {
            id: "EXP-2026-006",
            date: "2026-06-27",
            voucherNo: "VCH/2026/310",
            category: "fencing",
            categoryNameMr: "संरक्षक भिंत",
            categoryNameEn: "Fencing",
            fundSource: "fund_zp",
            fundSourceNameMr: "जि. प. स्वतःचा निधी",
            fundSourceNameEn: "ZP Own Fund",
            stage: "Walls & Construction",
            stageMr: "भिंती व स्ट्रक्चर (15%)",
            descriptionMr: "शाळा परिसराची २५० मीटर पूर्व बाजूची प्रीकास्ट कंपाऊंड भिंत",
            descriptionEn: "Precast Compound Wall construction for 250m eastern perimeter",
            vendorMr: "महाराष्ट्र प्रीकास्ट कन्स्ट्रक्शन",
            vendorEn: "Maharashtra Precast Construction",
            amount: 280000,
            status: "Completed",
            statusCode: "green",
            geoTagged: true,
            hasPhoto: true,
            photoUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
            remarksMr: "संरक्षक भिंत बांधून पूर्ण, सुरक्षा सुनिश्चित झाली.",
            remarksEn: "Perimeter boundary wall erected successfully."
        },
        {
            id: "EXP-2026-007",
            date: "2026-07-08",
            voucherNo: "VCH/2026/389",
            category: "classrooms",
            categoryNameMr: "वर्गखोल्या",
            categoryNameEn: "Classrooms",
            fundSource: "fund_annual",
            fundSourceNameMr: "वार्षिक योजना",
            fundSourceNameEn: "Annual Plan",
            stage: "Walls & Construction",
            stageMr: "भिंती व स्ट्रक्चर (15%)",
            descriptionMr: "आरसीसी स्लॅब कास्टिंग व ब्रिकवर्क साहित्य खरेदी चरण २",
            descriptionEn: "RCC Slab casting & brickwork material procurement Phase 2",
            vendorMr: "शिवनेरी इन्फ्रा प्रोजेक्ट्स",
            vendorEn: "Shivneri Infra Projects",
            amount: 150000,
            status: "Pending",
            statusCode: "yellow",
            geoTagged: true,
            hasPhoto: true,
            photoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80",
            remarksMr: "सचिवांकडून तांत्रिक मूल्यांकन व देयक मंजुरी प्रलंबित.",
            remarksEn: "Technical evaluation bill approval pending from Sachiv."
        },
        {
            id: "EXP-2026-008",
            date: "2026-07-16",
            voucherNo: "VCH/2026/412",
            category: "toilets",
            categoryNameMr: "स्वच्छतागृह",
            categoryNameEn: "Toilets",
            fundSource: "fund_mineral",
            fundSourceNameMr: "गौण खनिज निधी",
            fundSourceNameEn: "Minor Mineral Fund",
            stage: "Walls & Construction",
            stageMr: "भिंती व स्ट्रक्चर (15%)",
            descriptionMr: "स्वच्छतागृह प्लंबिंग व टाइल्स फिटिंग साहित्य खरेदी",
            descriptionEn: "Plumbing pipes, Sanitaryware & Tiles material procurement",
            vendorMr: "साई कन्स्ट्रक्शन कंपनी",
            vendorEn: "Sai Construction Co.",
            amount: 100000,
            status: "Pending",
            statusCode: "yellow",
            geoTagged: false,
            hasPhoto: true,
            photoUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
            remarksMr: "जिओ-टॅग फोटो अपलोड करणे बाकी आहे.",
            remarksEn: "Geo-tagged photograph verification pending."
        }
    ],

    // Monthly expenditure trend dataset for FR 5.3
    monthlyTrends: [
        { month: "एप्रिल 2026", monthEn: "Apr 2026", sanctionedCumulative: 2500000, actualSpent: 250000, monthlySpent: 250000 },
        { month: "मे 2026", monthEn: "May 2026", sanctionedCumulative: 2500000, actualSpent: 590000, monthlySpent: 340000 },
        { month: "जून 2026", monthEn: "Jun 2026", sanctionedCumulative: 2500000, actualSpent: 1190000, monthlySpent: 600000 },
        { month: "जुलै 2026 (चालू)", monthEn: "Jul 2026 (Current)", sanctionedCumulative: 2500000, actualSpent: 1640000, monthlySpent: 450000 }
    ],

    // CEO Executive Directives
    ceoInsights: [
        {
            id: "CEO-REC-01",
            titleMr: "मंजूर निधी उपयोगिता दर (Burn Rate Velocity)",
            titleEn: "Fund Deployment Velocity",
            status: "Optimal / सर्वोत्तम",
            type: "success",
            icon: "fa-rocket",
            messageMr: "शाळेने एकूण मंजूर निधीच्या ६५.६% (₹ १६,४०,०००) रक्कम कालबद्ध रीतीने प्रभावीपणे खर्च केली आहे. आर्थिक प्रगती नियमानुसार आहे.",
            messageEn: "The school has effectively deployed 65.6% (₹ 16.40 Lakhs) of total sanctioned funds in a time-bound manner. Spending velocity is optimal.",
            actionMr: "उर्वरित ₹ ८,६०,००० निधी फिनिशिंग व हस्तांतरण टप्प्यासाठी आरक्षित ठेवावा.",
            actionEn: "Reserve remaining ₹ 8.60 Lakhs for Finishing & Handover stage."
        },
        {
            id: "CEO-REC-02",
            titleMr: "जिओ-टॅगिंग ऑडिट अनुपालन (Audit Compliance Score)",
            titleEn: "Geo-Tagging Audit Compliance",
            status: "87.5% Compliant",
            type: "warning",
            icon: "fa-location-dot",
            messageMr: "एकूण ८ नोंदींपैकी ७ नोंदींना जिओ-टॅग व वेळेचा शिक्का (Timestamp) संलग्न आहे. १ प्रलंबित बिलाचे जिओ-टॅगिंग त्वरित पूर्ण करा.",
            messageEn: "7 out of 8 entries have verified geo-tags & timestamp proof. 1 pending bill (EXP-2026-008) requires immediate photo geo-tagging.",
            actionMr: "सचिवांच्या मंजुरीपूर्वी ॲपद्वारे थेट जिओ-टॅग फोटो अपलोड करा.",
            actionEn: "Upload verified geo-tagged photo prior to Sachiv review."
        },
        {
            id: "CEO-REC-03",
            titleMr: "निधी संपण्याचा अंदाजित कालावधी (Runway Projection)",
            titleEn: "Estimated Fund Exhaustion Runway",
            status: "62 Days Remaining",
            type: "info",
            icon: "fa-hourglass-half",
            messageMr: "सध्याच्या सरासरी दैनिक खर्च दरानुसार (₹ १५,०००/दिवस), उर्वरित ₹ ८,६०,००० निधी पुढील ६२ दिवसांत पूर्ण कामासाठी पुरेसा आहे.",
            messageEn: "Based on current daily burn rate of ₹ 15,000/day, remaining funds of ₹ 8.60 Lakhs will cover project completion over the next 62 days.",
            actionMr: "ऑगस्ट अखेरपर्यंत वर्गखोल्या व स्वच्छतागृह हस्तांतरण पूर्ण करण्याचे नियोजन करावे.",
            actionEn: "Target complete handover of Classrooms and Toilets by end of August."
        }
    ]
};
