// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract AutoRefillWallet {
    address public owner;
    address payable public hotWallet;
    uint256 public threshold;
    uint256 public refillAmount;

    event Refilled(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo owner puede ejecutar");
        _;
    }

    constructor(
        address payable _hotWallet,
        uint256 _threshold,
        uint256 _refillAmount
    ) {
        owner = msg.sender;
        hotWallet = _hotWallet;
        threshold = _threshold;
        refillAmount = _refillAmount;
    }

    // Permitir depositar fondos al contrato
    function deposit() external payable {}

    // Actualiza parámetros threshold y refillAmount
    function updateParams(uint256 _threshold, uint256 _refillAmount) external onlyOwner {
        threshold = _threshold;
        refillAmount = _refillAmount;
    }

    // Función principal que se llamará para verificar saldo y recargar
    function checkAndRefill() external {
        require(hotWallet.balance < threshold, "El saldo es suficiente");
        require(address(this).balance >= refillAmount, "Fondos insuficientes en el contrato");

        (bool success, ) = hotWallet.call{value: refillAmount}("");
        require(success, "El refill falló");

        emit Refilled(hotWallet, refillAmount);
    }

    // Cambiar hotWallet
    function updateHotWallet(address payable _newHotWallet) external onlyOwner {
        hotWallet = _newHotWallet;
    }
}
