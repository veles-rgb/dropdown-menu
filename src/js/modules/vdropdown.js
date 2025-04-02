const vDropDownMenu = document.querySelectorAll(".v-dropdown-menu");
let listenerEvent = null;

function activateDropdown() {
    vDropDownMenu.forEach(menu => {
        const dropdownItems = menu.querySelector(".v-dropdown-items");
        const menuBtn = menu.querySelector(".v-dropdown-obj");

        // Define the type of eventListener based on class
        if (menu.classList.contains("v-click")) {
            listenerEvent = "click";
        } else if (menu.classList.contains("v-hover")) {
            listenerEvent = "mouseenter";
        }

        menu.addEventListener(listenerEvent, (event) => {
            event.stopPropagation();

            // Close all other dropdowns
            vDropDownMenu.forEach(otherMenu => {
                const otherDropdownItems = otherMenu.querySelector(".v-dropdown-items");
                const otherMenuBtns = otherMenu.querySelector(".v-dropdown-obj");
                if (otherDropdownItems !== dropdownItems) {
                    otherDropdownItems.classList.remove("v-visible");
                }
                if (otherMenuBtns !== menuBtn) {
                    otherMenuBtns.classList.remove("v-active");
                }
            });

            // Toggle visibility and active state of the clicked dropdown
            if (dropdownItems.classList.contains("v-visible")) {
                dropdownItems.classList.remove("v-visible");
                menuBtn.classList.remove("v-active");
            } else {
                dropdownItems.classList.add("v-visible");
                menuBtn.classList.add("v-active");
            }
        });

        // Handle mouseleave to close the dropdown if using mouseenter
        if (listenerEvent === "mouseenter") {
            menu.addEventListener("mouseleave", () => {
                dropdownItems.classList.remove("v-visible");
                menuBtn.classList.remove("v-active");
            });
        }
    });

    // Close all dropdowns when clicking outside
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