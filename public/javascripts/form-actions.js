// Chọn nhiều + thực hiện hành động 
// Dùng chung cho form .
document.addEventListener('DOMContentLoaded', function () {
    const containerForm = document.forms['container-form'];
    if (!containerForm) return;

    const checkboxAll = containerForm.querySelector('#checkbox-all');   
    const courseItemCheckboxes = containerForm.querySelectorAll('input[name="courseIds"]');
    const checkAllSubmitBtn = containerForm.querySelector('.check-all-submit-btn');
    const actionSelect = containerForm.querySelector('select[name="action"]');

    // Chưa có khóa học thì không tick "Chọn tất cả"
    checkboxAll.disabled = courseItemCheckboxes.length === 0;

    // Bật/tắt nút "Thực hiện" 
    function renderCheckAllSubmitBtn() {
        const checkedCount = containerForm.querySelectorAll('input[name="courseIds"]:checked').length;
        checkAllSubmitBtn.disabled = checkedCount === 0;
    }

    // Tick "Chọn tất cả" → tick/bỏ tick toàn bộ khóa học
    checkboxAll.addEventListener('change', function () {
        courseItemCheckboxes.forEach((checkbox) => {
            checkbox.checked = checkboxAll.checked;
        });
        renderCheckAllSubmitBtn();
    });

    // Tick từng khóa học → "Chọn tất cả" chỉ được tick khi tất cả đều được tick
    courseItemCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            const isCheckedAll =
                courseItemCheckboxes.length ===
                containerForm.querySelectorAll('input[name="courseIds"]:checked').length;
            checkboxAll.checked = isCheckedAll;
            renderCheckAllSubmitBtn();
        });
    });

    // Chặn submit khi chưa chọn khóa học nào; hỏi lại trước khi xóa vĩnh viễn
    containerForm.addEventListener('submit', function (event) {
        if (checkAllSubmitBtn.disabled) {
            event.preventDefault();
            return;
        }

        if (
            actionSelect.value === 'forceDelete' &&
            !confirm('Các khóa học đã chọn sẽ bị xóa vĩnh viễn và không thể khôi phục. Tiếp tục?')
        ) {
            event.preventDefault();
        }
    });

    renderCheckAllSubmitBtn();
});
