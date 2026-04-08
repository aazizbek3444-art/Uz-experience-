document.addEventListener("DOMContentLoaded", () => {
    // 1. Silliq aylantirish (Navbar uchun)
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Qishloqlar va narxlar ma'lumotlar bazasi (Siz so'ragan narxlar asosida)
    const villageData = {
        "Sentob": { full: "Sentob Qishlog'i", acc: "$15 – $25", meal: "$5 – $10", exp: "$10 – $15", trans: "$8 – $15" },
        "Hayot": { full: "Hayot Qishlog'i", acc: "$10 – $20", meal: "$4 – $8", exp: "$5 – $12", trans: "$5 – $10" },
        "Gelan": { full: "Gelan Qishlog'i", acc: "$20 – $30", meal: "$6 – $10", exp: "$15 – $20", trans: "$10 – $15" },
        "Sarchashma": { full: "Sarchashma Qishlog'i", acc: "$15 – $25", meal: "$5 – $9", exp: "$12 – $18", trans: "$8 – $12" },
        "Asraf": { full: "Asraf Qishlog'i", acc: "$10 – $20", meal: "$3 – $7", exp: "$5 – $10", trans: "$2 – $8" },
        "Uhum": { full: "Uhum Qishlog'i", acc: "$12 – $22", meal: "$4 – $8", exp: "$8 – $15", trans: "$4 – $10" }
    };

    // 3. Modal Logikasi
    const modal = document.getElementById("villageModal");
    const closeBtn = document.querySelector(".close-btn");
    
    // Modal elementlarini tanlash
    const mTitle = document.getElementById("modalVillageName");
    const mAcc = document.getElementById("m-acc");
    const mMeal = document.getElementById("m-meal");
    const mExp = document.getElementById("m-exp");
    const mTrans = document.getElementById("m-trans");

    // Har bir rasm uchun click hodisasi qo'shish
    const images = document.querySelectorAll('.img-box img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            // Rasm joylashgan card dan qishloq nomini topamiz
            const villageKey = this.closest('.village-card').getAttribute('data-village');
            const data = villageData[villageKey];

            if (data) {
                // Ma'lumotlarni modalga kiritish
                mTitle.textContent = data.full;
                mAcc.textContent = data.acc;
                mMeal.textContent = data.meal;
                mExp.textContent = data.exp;
                mTrans.textContent = data.trans;

                // Modalni ochish
                modal.style.display = "block";
            }
        });
    });

    // Yopish tugmasi bosilganda modalni yopish
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Modal atrofidagi bo'sh joyga bosilganda ham yopilishi
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("villageModal");
    const summaryInput = document.getElementById("selectedSummary");
    const finalPriceDisplay = document.getElementById("finalPrice");
    const hiddenPriceInput = document.getElementById("hiddenTotalPrice");
    let currentVillage = "";

    // 1. Rasmni bosganda modalni ochish
    document.querySelectorAll('.img-box img').forEach(img => {
        img.addEventListener('click', function() {
            currentVillage = this.closest('.village-card').querySelector('h4').textContent;
            document.getElementById("modalVillageName").textContent = currentVillage;
            
            // Checkboxlarni tozalash
            document.querySelectorAll('.service-check').forEach(ch => ch.checked = false);
            modal.style.display = "block";
        });
    });

    // 2. Tasdiqlash tugmasini bosganda
    document.getElementById("addSelection").addEventListener('click', () => {
        const selected = [];
        let total = 0;

        document.querySelectorAll('.service-check:checked').forEach(ch => {
            selected.push(ch.value);
            total += parseInt(ch.getAttribute('data-price'));
        });

        if (selected.length > 0) {
            // Formadagi maydonlarni to'ldirish
            summaryInput.value = `Qishloq: ${currentVillage}\nXizmatlar: ${selected.join(', ')}`;
            finalPriceDisplay.textContent = `$${total}`;
            hiddenPriceInput.value = total;

            // Modalni yopish va formaga skroll qilish
            modal.style.display = "none";
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Iltimos, kamida bitta xizmatni tanlang!");
        }
    });

    // Modalni yopish logikasi (avvalgi koddan)
    document.querySelector(".close-btn").onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };
});
document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('.calc-check');
    const priceDisplay = document.getElementById('totalPriceDisplay');
    const totalInput = document.getElementById('totalAmountInput');

    function calculateTotal() {
        let total = 0;
        checkboxes.forEach(item => {
            if (item.checked) {
                // data-price atributidan narxni olamiz
                total += parseInt(item.getAttribute('data-price'));
            }
        });
        
        // Ekranda ko'rsatish
        priceDisplay.textContent = `$${total}`;
        // Yashirin inputga yozish (Formspree ga borishi uchun)
        totalInput.value = `$${total}`;
    }

    // Har bir checkbox bosilganda hisoblashni ishga tushirish
    checkboxes.forEach(box => {
        box.addEventListener('change', calculateTotal);
    });

    // Qishloq o'zgarganda ham biror amal kerak bo'lsa (ixtiyoriy)
    document.getElementById('villageSelect').addEventListener('change', () => {
        console.log("Qishloq tanlandi, endi xizmatlarni tanlang.");
    });
});