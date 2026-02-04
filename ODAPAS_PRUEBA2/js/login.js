document.addEventListener('DOMContentLoaded', function() {
    // Elementos del formulario
    const loginForm = document.getElementById('loginForm');
    const areaSelect = document.getElementById('area');
    const userTypeSelect = document.getElementById('userType');
    const workerCodeInput = document.getElementById('workerCode');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const loginBtn = document.getElementById('loginBtn');
    const recoveryModal = document.getElementById('recoveryModal');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Alternar visibilidad de contraseña
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = targetId ? document.getElementById(targetId) : this.closest('.input-with-icon').querySelector('input[type="password"]');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
    
    // Manejo del formulario de login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Resetear errores
        clearErrors();
        
        // Validaciones básicas
        let isValid = true;
        
        if (!areaSelect.value) {
            showError('errorArea', 'Por favor seleccione un área');
            isValid = false;
        }
        
        if (!userTypeSelect.value) {
            showError('errorUserType', 'Por favor seleccione un rol');
            isValid = false;
        }
        
        if (!workerCodeInput.value.trim()) {
            showError('errorWorkerCode', 'Por favor ingrese su número de trabajador');
            isValid = false;
        }
        
        if (!passwordInput.value.trim()) {
            showError('errorPassword', 'Por favor ingrese su contraseña');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Deshabilitar botón durante la petición
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Verificando...</span>';
        loginBtn.disabled = true;
        
        try {
            // Preparar datos para enviar
            const loginData = {
                area: areaSelect.value,
                tipo_rol: userTypeSelect.value,
                no_nomina: workerCodeInput.value.trim(),
                password: passwordInput.value.trim()
            };
            
            // Enviar petición al servidor
            const response = await fetch('php/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Login exitoso
                showSuccess('Login exitoso! Redirigiendo...');
                
                // Guardar datos en localStorage
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                
                // Redirigir según el rol y área
                setTimeout(() => {
                    // Aquí puedes redirigir a diferentes páginas según el rol y área
                    if (data.usuario.tipo_rol === 'jefe') {
                        window.location.href = 'dashboard-jefe.html';
                    } else {
                        window.location.href = 'dashboard-empleado.html';
                    }
                }, 1500);
                
            } else {
                // Error en el login
                showError('errorPassword', data.message || 'Credenciales incorrectas');
            }
            
        } catch (error) {
            console.error('Error:', error);
            showError('errorPassword', 'Error de conexión con el servidor');
        } finally {
            // Restaurar botón
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        }
    });
    
    // Modal de recuperación de contraseña
    forgotPasswordLink?.addEventListener('click', function(e) {
        e.preventDefault();
        recoveryModal.style.display = 'flex';
    });
    
    // Cerrar modales
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal') || 'recoveryModal';
            document.getElementById(modalId).style.display = 'none';
        });
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Funciones auxiliares
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Resaltar el campo con error
            const inputElement = errorElement.closest('.form-group').querySelector('input, select');
            if (inputElement) {
                inputElement.style.borderColor = '#e74c3c';
            }
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });
        
        // Restaurar bordes
        document.querySelectorAll('input, select').forEach(el => {
            el.style.borderColor = '';
        });
    }
    
    function showSuccess(message) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: message,
            timer: 1500,
            showConfirmButton: false
        });
    }
    
    // Validación en tiempo real
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
        
        input.addEventListener('change', function() {
            clearFieldError(this);
        });
    });
    
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
                field.style.borderColor = '';
            }
        }
    }
    
    // Ayuda contextual
    document.getElementById('helpLink')?.addEventListener('click', function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Ayuda - Sistema ODAPAS',
            html: `
                <div style="text-align: left;">
                    <p><strong>Credenciales de prueba:</strong></p>
                    <ul>
                        <li>Área: Cualquiera de las 5 opciones</li>
                        <li>Rol: jefe o empleado</li>
                        <li>No. de trabajador: Ej. RH001, FIN002, TEC001, etc.</li>
                        <li>Contraseña: 123456</li>
                    </ul>
                    <p><strong>Ejemplos:</strong></p>
                    <ul>
                        <li>Área: Recursos Humanos, Rol: jefe, No.: RH001</li>
                        <li>Área: Finanzas, Rol: empleado, No.: FIN002</li>
                    </ul>
                </div>
            `,
            icon: 'info'
        });
    });
});