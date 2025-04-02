const vDropDownMenu = document.querySelectorAll(".v-dropdown-menu");
let listenerEvent = null;

function activateDropdown() {
    vDropDownMenu.forEach(menu => {
        const dropdownItems = menu.querySelector(".v-dropdown-items");

        if (menu.classList.contains("v-click")) {
            listenerEvent = "click";
        } else if (menu.classList.contains("v-hover")) {
            listenerEvent = "mouseenter";
        }

        menu.addEventListener(listenerEvent, (event) => {
            event.stopPropagation();
            vDropDownMenu.forEach(otherMenu => {
                const otherDropdownItems = otherMenu.querySelector(".v-dropdown-items");
                const otherDropDownBtns = otherMenu.querySelector(".v-dropdown-obj");
                if (otherDropdownItems !== dropdownItems) {
                    otherDropdownItems.classList.remove("v-visible");
                }
                if (otherDropDownBtns !== dropdownItems) {
                    otherDropDownBtns.classList.remove("v-active");
                }
            });
            dropdownItems.classList.toggle("v-visible");
            const menuBtn = menu.querySelector(".v-dropdown-obj");
            menuBtn.classList.toggle("v-active");
        });

        if (listenerEvent === "mouseenter") {
            menu.addEventListener("mouseleave", () => {
                dropdownItems.classList.remove("v-visible");
                const menuBtn = menu.querySelector(".v-dropdown-obj");
                menuBtn.classList.remove("v-active");
            });
        }
    });

    document.addEventListener(listenerEvent, () => {
        vDropDownMenu.forEach(menu => {
            const dropdownItems = menu.querySelector(".v-dropdown-items");
            const menuBtn = menu.querySelector(".v-dropdown-obj");
            dropdownItems.classList.remove("v-visible");
            menuBtn.classList.remove("v-active");
        });
    });
};

export { activateDropdown };
