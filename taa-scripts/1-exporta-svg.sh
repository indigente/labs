#!/bin/bash
#
# Exporta arquivos .svg de objetos da cena para arquivos .png
# Execute na pasta onde estão os arquivos .svg.
#

DPI=180

function export {
	inkscape --without-gui --export-area-drawing --export-dpi=$DPI --export-png=build/images/objeto$2.png ./svg/$1.svg
}

export 108 1	# xicara
export 110 2	# uva
export 112 3	# torta
export 114 4	# tomate
export 116 5	# taca
export 118 6	# sanduiche
export 120 7	# sal
export 122 8	# rolo
export 124 9	# pimentao
export 126 10	# pessego
export 128 11	# pera
export 130 12	# pao
export 132 13	# panela
export 134 14	# morango
export 136 15	# milho
export 138 16	# melancia
export 140 17	# macan
export 142 18	# luva
export 144 19	# limao
export 146 20	# laranja
export 148 21	# jarra
export 150 22	# garrafa
export 152 23	# garfo
export 154 24	# frigideira
export 156 25	# faca
export 158 26	# cumbuca
export 186 27	# copo
export 160 28	# colher
export 162 29	# chaleira
export 164 30	# cereja
export 166 31	# cenoura
export 168 32	# cebola
export 170 33	# batata
export 172 34	# banana
export 174 35	# amendoim
export 176 36	# alface
export 178 37	# alcachofra
export 180 38	# acelga
export 182 39	# abobora
export 184 40	# abacaxi