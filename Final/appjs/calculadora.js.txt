// ====================================
// CALCULADORA DE IMPACTO
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const calcForm = document.getElementById('impact-calculator-form');
    
    if (!calcForm) return;
  
    calcForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Obtenemos el valor del input
      const donationInput = document.getElementById('donation-amount');
      const donation = parseFloat(donationInput.value);
      const resultDiv = document.getElementById('impact-result');
      
      // Validación simple
      if (isNaN(donation) || donation <= 0) {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<p style="color: red; text-align: center; margin-top: 1rem;">Por favor ingresa un monto válido mayor a 0</p>';
        return;
      }
  
      // LÓGICA DE CÁLCULO (Valores aproximados para el ejemplo)
      // $500 = 1 árbol (ejemplo hipotético basado en tu contenido)
      const costPerTree = 500; 
      const treesPlanted = Math.floor(donation / costPerTree);
      
      // 1 árbol absorbe aprox 22kg de CO2 al año
      const co2Absorbed = Math.floor(treesPlanted * 22); 
      
      // Metros cuadrados restaurados (ejemplo: 1 árbol cada 5m2)
      const m2Restored = Math.floor(treesPlanted * 5);
  
      // Generación del HTML de resultados
      // Nota: Si el monto es muy bajo (< 500), mostramos mensaje de ánimo
      if (treesPlanted < 1) {
        resultDiv.innerHTML = `
          <div class="impact-results">
            <h3 style="color: var(--verde-bosque); margin-bottom: 1rem;">¡Gracias por tu interés!</h3>
            <p style="text-align: center;">
              Con <strong>$${donation.toLocaleString('es-AR')}</strong> nos ayudás a comprar herramientas y semillas.
              <br><small>Necesitamos $${costPerTree} para plantar un árbol completo.</small>
            </p>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `
          <div class="impact-results">
            <h3 style="color: var(--verde-bosque); margin-bottom: 1.5rem;">Tu impacto estimado:</h3>
            
            <div class="stats-container">
              <div class="stat-box">
                <div class="stat-number">🌳 ${treesPlanted}</div>
                <div class="stat-label">Árboles nativos</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">💨 ${co2Absorbed} kg</div>
                <div class="stat-label">CO₂ absorbido/año</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">🌿 ${m2Restored} m²</div>
                <div class="stat-label">Área restaurada</div>
              </div>
            </div>
  
            <p style="text-align: center; margin-top: 2rem; font-size: 1.1rem;">
              Con tu aporte de <strong>$${donation.toLocaleString('es-AR')}</strong>, 
              estarás contribuyendo a restaurar el equilibrio de nuestros espacios urbanos.
            </p>
          </div>
        `;
      }
      
      // Mostrar resultado y scroll suave
      resultDiv.style.display = 'block';
      
      // Pequeña animación de entrada
      resultDiv.style.opacity = '0';
      setTimeout(() => {
          resultDiv.style.transition = 'opacity 0.5s ease';
          resultDiv.style.opacity = '1';
      }, 10);
    });
  });